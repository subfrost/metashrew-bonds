import { BalanceSheet } from "./BalanceSheet";
import { Box } from "metashrew-as/assembly/utils/box";
import { Edict } from "./Edict";
import { RuneId } from "./RuneId";
import { RunesBlock } from "./RunesBlock";
import { RunestoneMessage } from "./RunestoneMessage";
import { RunesTransaction } from "./RunesTransaction";
import { Block } from "metashrew-as/assembly/blockdata/block";
import { Flag } from "./Flag";
import { Field } from "./Field";
import { scriptParse } from "metashrew-as/assembly/utils/yabsp";
import { u256, u128 } from "as-bignum/assembly";
import { console } from "metashrew-as/assembly/utils/logging";
import {
  fieldTo,
  toPrimitive,
  toArrayBuffer,
  inspectEdicts,
  min,
} from "../utils";
import {
  OUTPOINT_TO_RUNES,
  OUTPOINT_TO_HEIGHT,
  HEIGHT_TO_BLOCKHASH,
  BLOCKHASH_TO_HEIGHT,
  HEIGHT_TO_RECEIVED_BTC,
  HEIGHT_TO_RECEIVED_RUNE,
  GENESIS,
} from "./constants";
import {
  Transaction,
  Input,
  Output,
  OutPoint,
} from "metashrew-as/assembly/blockdata/transaction";
import { trap } from "../";
import {
  OUTPOINTS_FOR_ADDRESS,
  OUTPOINT_SPENDABLE_BY,
  OUTPOINT_TO_OUTPUT,
} from "metashrew-spendables/assembly/tables";
import { metashrew_runes as protobuf } from "../proto/metashrew-runes";

export class Index {
  static indexOutpoints(
    tx: RunesTransaction,
    txid: ArrayBuffer,
    height: u32,
  ): void {
    for (let i: i32 = 0; i < tx.outs.length; i++) {
      OUTPOINT_TO_HEIGHT.select(
        OutPoint.from(txid, <u32>i).toArrayBuffer(),
      ).setValue<u32>(height);
    }
  }
  static findCommitment(
    tx: RunesTransaction,
    name: ArrayBuffer,
    height: u32,
  ): ArrayBuffer {
    for (let i = 0; i < tx.ins.length; i++) {
      const input = tx.ins[i];
      // check that there is 1 data push
      const inscription = input.inscription();
      if (changetype<usize>(inscription) === 0) continue;
      const commitment = inscription.body();
      if (!commitment) continue;
      const previousOutpoint = tx.ins[i].previousOutput().toArrayBuffer();
      if (
        height - OUTPOINT_TO_HEIGHT.select(previousOutpoint).getValue<u32>() >=
        6
      ) {
        // check the commitment has at least 6 confirmations
        if (isEqualArrayBuffer(name, commitment)) return commitment;
      }
    }
    return changetype<ArrayBuffer>(0);
  }
  static indexBlock(height: u32, _block: Block): void {
    const block = changetype<RunesBlock>(_block);
    console.log("METASHREW_RUNES_LOG::indexing block: " + height.toString());
    HEIGHT_TO_BLOCKHASH.selectValue<u32>(height).set(block.blockhash());
    BLOCKHASH_TO_HEIGHT.select(block.blockhash()).setValue<u32>(height);
    block.saveTransactions(height);
    const receiptItems: Map<string, protobuf.AddressReceivedReceipt> =
      new Map<string, protobuf.AddressReceivedReceipt>();

    for (let i: i32 = 0; i < block.transactions.length; i++) {
      const tx = block.getTransaction(i);
      const txid = tx.txid();
      Index.indexOutpoints(tx, txid, height);

      // find sender addr
      let senderAddr = new ArrayBuffer(0);
      for (let in_idx = 0; i < tx.ins.length; in_idx++) {
        const input: Input = tx.ins[in_idx];
        const addr = OUTPOINT_SPENDABLE_BY.select(
          input.previousOutput().toArrayBuffer(),
        ).get();
        // send_addr = the first tx inputs sender with valid addr
        if (addr != null) {
          senderAddr = addr;
          break;
        }
      }
      // TODO: assert(senderAddr.byteLength != 0,"Unable to find sender address in tx");

      const runestoneOutputIndex = tx.runestoneOutputIndex();
      if (height >= GENESIS && runestoneOutputIndex !== -1) {
        // processes the runestone message
        const runestoneOutput = tx.outs[runestoneOutputIndex];
        const outpoint = tx.outpoint(runestoneOutputIndex);
        const parsed = scriptParse(runestoneOutput.script).slice(2);
        if (
          parsed.findIndex((v: Box, i: i32, ary: Array<Box>) => {
            return v.start === usize.MAX_VALUE;
          }) !== -1
        )
          continue; // non-data push: cenotaph
        const payload = Box.concat(parsed);
        const message = RunestoneMessage.parse(payload);
        if (changetype<usize>(message) === 0) continue;
        const edicts = Edict.fromDeltaSeries(message.edicts);
        let etchingBalanceSheet = changetype<BalanceSheet>(0);
        let initialBalanceSheet = BalanceSheet.concat(
          tx.ins.map<BalanceSheet>((v: Input, i: i32, ary: Array<Input>) =>
            BalanceSheet.load(
              OUTPOINT_TO_RUNES.select(v.previousOutput().toArrayBuffer()),
            ),
          ),
        );

        const balancesByOutput = new Map<u32, BalanceSheet>();
        const hasMinted = message.mint(
          height,
          changetype<usize>(initialBalanceSheet),
        );
        const hasEtched = message.etch(
          <u64>height,
          <u32>i,
          changetype<usize>(initialBalanceSheet),
        );

        if (hasMinted || hasEtched) {
          const unallocatedTo = message.fields.has(Field.POINTER)
            ? fieldTo<u32>(message.fields.get(Field.POINTER))
            : <u32>tx.defaultOutput();
          if (balancesByOutput.has(unallocatedTo)) {
            initialBalanceSheet.pipe(balancesByOutput.get(unallocatedTo));
          } else {
            balancesByOutput.set(unallocatedTo, initialBalanceSheet);
          }
        }

        for (let e = 0; e < edicts.length; e++) {
          const edict = edicts[e];
          const edictOutput = toPrimitive<u32>(edict.output);
          const runeId = edict.runeId();
          const runeIdBytes = runeId.toBytes();
          let outputBalanceSheet = changetype<BalanceSheet>(0);
          if (!balancesByOutput.has(edictOutput)) {
            balancesByOutput.set(
              edictOutput,
              (outputBalanceSheet = new BalanceSheet()),
            );
          } else outputBalanceSheet = balancesByOutput.get(edictOutput);
          const amount = min(
            edict.amount,
            initialBalanceSheet.get(runeIdBytes),
          );

          initialBalanceSheet.decrease(runeIdBytes, amount);
          outputBalanceSheet.increase(runeIdBytes, amount);

          // get the address this rune is going to
          const recvAddr = OUTPOINT_SPENDABLE_BY.select(
            OutPoint.from(txid, edictOutput).toArrayBuffer(),
          ).get();
          const recvAddrStr = recvAddr.toString();

          // height_to rune --> height --> recv_addr = (runeId, amount, send_addr)

          let receiptItemProto: protobuf.AddressReceivedReceipt;
          if (receiptItems.has(recvAddrStr)) {
            receiptItemProto = receiptItems.get(recvAddrStr);
          } else {
            receiptItemProto = new protobuf.AddressReceivedReceipt();
            const runeIdProto = new protobuf.RuneId();
            runeIdProto.height = <u32>runeId.block; // copied from outpoint.ts, is this safe?
            runeIdProto.txindex = runeId.tx;

            receiptItemProto.runeId = runeIdProto;
            receiptItems.set(recvAddrStr, receiptItemProto);
          }

          const amountProto = new protobuf.AddressReceivedAmount();
          amountProto.senderAddress = changetype<Array<u8>>(
            Uint8Array.wrap(senderAddr),
          );

          amountProto.amount = changetype<Array<u8>>(amount.toUint8Array());

          receiptItemProto.amounts.push(amountProto);
        }

        const runesToOutputs = balancesByOutput.keys();

        for (let x = 0; x < runesToOutputs.length; x++) {
          const sheet = balancesByOutput.get(runesToOutputs[x]);
          sheet.save(
            OUTPOINT_TO_RUNES.select(
              OutPoint.from(txid, runesToOutputs[x]).toArrayBuffer(),
            ),
          );
        }
      } else {
        // there is no runestone message, process BTC transfer
      }
    }

    const allRecvAddr = receiptItems.keys();
    for (let map_idx: i32 = 0; map_idx < receiptItems.size; map_idx++) {
      const recvAddr = allRecvAddr[map_idx];
      const receiptItemProto = receiptItems.get(recvAddr);

      HEIGHT_TO_RECEIVED_RUNE.selectValue<u32>(height)
        .select(String.UTF8.encode(recvAddr))
        .append(receiptItemProto.encode());
    }
  }
}
