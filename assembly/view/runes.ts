import {
  ETCHINGS,
  ETCHING_TO_RUNE_ID,
  SPACERS,
  DIVISIBILITY,
  SYMBOL,
} from "../indexer/constants";
import { metashrew_runes } from "../proto/metashrew-runes";
import { input } from "metashrew-as/assembly/indexer";
import { RuneId } from "../indexer/RuneId";
import { u128 } from "as-bignum/assembly";
import { fromArrayBuffer, fieldToName } from "../utils";

export function runes(): ArrayBuffer {
  const inp = metashrew_runes.PaginationInput.decode(input().slice(4));
  const start = inp.start;
  const end = inp.end;
  let _list: Array<ArrayBuffer> = new Array<ArrayBuffer>(0);
  if (inp.end == 0) {
    _list = ETCHINGS.getList();
  } else {
    for (let i = start; i < end; i++) {
      _list.push(ETCHINGS.selectIndex(i).get());
    }
  }
  const list = _list.map<metashrew_runes.Rune>((d) => {
    const name = fromArrayBuffer(d);
    const rune = new metashrew_runes.Rune();
    const runeId = new metashrew_runes.RuneId();
    const _runeId = RuneId.fromBytesU128(ETCHING_TO_RUNE_ID.select(d).get());

    runeId.block = _runeId.block;
    runeId.tx = _runeId.tx;

    rune.runeId = runeId;
    rune.name = Uint8Array.wrap(String.UTF8.encode(fieldToName(name))).reduce<
      Array<u8>
    >((a, d) => {
      a.push(d);
      return a;
    }, new Array<u8>());
    rune.divisibility = <u32>DIVISIBILITY.select(d).getValue<u8>();
    rune.symbol = <u32>SYMBOL.select(d).getValue<u8>();
    rune.spacers = SPACERS.select(d).getValue<u32>();
    return rune;
  });
  const message = new metashrew_runes.RunesOutput();
  message.runes = list;

  return message.encode();
}
