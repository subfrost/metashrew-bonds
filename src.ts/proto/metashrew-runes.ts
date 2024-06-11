// @generated by protobuf-ts 2.9.4
// @generated from protobuf file "metashrew-runes.proto" (package "metashrew_runes", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message metashrew_runes.RuneId
 */
export interface RuneId {
    /**
     * @generated from protobuf field: uint64 block = 1;
     */
    block: bigint;
    /**
     * @generated from protobuf field: uint32 tx = 2;
     */
    tx: number;
}
/**
 * @generated from protobuf message metashrew_runes.Rune
 */
export interface Rune {
    /**
     * @generated from protobuf field: metashrew_runes.RuneId runeId = 1;
     */
    runeId?: RuneId;
    /**
     * @generated from protobuf field: bytes name = 2;
     */
    name: Uint8Array;
    /**
     * @generated from protobuf field: uint32 divisibility = 3;
     */
    divisibility: number;
    /**
     * @generated from protobuf field: uint32 spacers = 4;
     */
    spacers: number;
    /**
     * @generated from protobuf field: uint32 symbol = 5;
     */
    symbol: number;
}
/**
 * @generated from protobuf message metashrew_runes.Outpoint
 */
export interface Outpoint {
    /**
     * @generated from protobuf field: repeated metashrew_runes.Rune runes = 1;
     */
    runes: Rune[];
    /**
     * @generated from protobuf field: repeated bytes balances = 2;
     */
    balances: Uint8Array[];
}
/**
 * @generated from protobuf message metashrew_runes.OutpointInput
 */
export interface OutpointInput {
    /**
     * @generated from protobuf field: bytes txid = 1;
     */
    txid: Uint8Array;
    /**
     * @generated from protobuf field: uint32 pos = 2;
     */
    pos: number;
}
/**
 * @generated from protobuf message metashrew_runes.PaginationInput
 */
export interface PaginationInput {
    /**
     * @generated from protobuf field: uint32 start = 1;
     */
    start: number;
    /**
     * @generated from protobuf field: uint32 end = 2;
     */
    end: number;
}
/**
 * @generated from protobuf message metashrew_runes.RunesOutput
 */
export interface RunesOutput {
    /**
     * @generated from protobuf field: repeated metashrew_runes.Rune runes = 1;
     */
    runes: Rune[];
}
// @generated message type with reflection information, may provide speed optimized methods
class RuneId$Type extends MessageType<RuneId> {
    constructor() {
        super("metashrew_runes.RuneId", [
            { no: 1, name: "block", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "tx", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<RuneId>): RuneId {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.block = 0n;
        message.tx = 0;
        if (value !== undefined)
            reflectionMergePartial<RuneId>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RuneId): RuneId {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint64 block */ 1:
                    message.block = reader.uint64().toBigInt();
                    break;
                case /* uint32 tx */ 2:
                    message.tx = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RuneId, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint64 block = 1; */
        if (message.block !== 0n)
            writer.tag(1, WireType.Varint).uint64(message.block);
        /* uint32 tx = 2; */
        if (message.tx !== 0)
            writer.tag(2, WireType.Varint).uint32(message.tx);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message metashrew_runes.RuneId
 */
export const RuneId = new RuneId$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Rune$Type extends MessageType<Rune> {
    constructor() {
        super("metashrew_runes.Rune", [
            { no: 1, name: "runeId", kind: "message", T: () => RuneId },
            { no: 2, name: "name", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 3, name: "divisibility", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "spacers", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 5, name: "symbol", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<Rune>): Rune {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = new Uint8Array(0);
        message.divisibility = 0;
        message.spacers = 0;
        message.symbol = 0;
        if (value !== undefined)
            reflectionMergePartial<Rune>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Rune): Rune {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* metashrew_runes.RuneId runeId */ 1:
                    message.runeId = RuneId.internalBinaryRead(reader, reader.uint32(), options, message.runeId);
                    break;
                case /* bytes name */ 2:
                    message.name = reader.bytes();
                    break;
                case /* uint32 divisibility */ 3:
                    message.divisibility = reader.uint32();
                    break;
                case /* uint32 spacers */ 4:
                    message.spacers = reader.uint32();
                    break;
                case /* uint32 symbol */ 5:
                    message.symbol = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Rune, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* metashrew_runes.RuneId runeId = 1; */
        if (message.runeId)
            RuneId.internalBinaryWrite(message.runeId, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* bytes name = 2; */
        if (message.name.length)
            writer.tag(2, WireType.LengthDelimited).bytes(message.name);
        /* uint32 divisibility = 3; */
        if (message.divisibility !== 0)
            writer.tag(3, WireType.Varint).uint32(message.divisibility);
        /* uint32 spacers = 4; */
        if (message.spacers !== 0)
            writer.tag(4, WireType.Varint).uint32(message.spacers);
        /* uint32 symbol = 5; */
        if (message.symbol !== 0)
            writer.tag(5, WireType.Varint).uint32(message.symbol);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message metashrew_runes.Rune
 */
export const Rune = new Rune$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Outpoint$Type extends MessageType<Outpoint> {
    constructor() {
        super("metashrew_runes.Outpoint", [
            { no: 1, name: "runes", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Rune },
            { no: 2, name: "balances", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<Outpoint>): Outpoint {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.runes = [];
        message.balances = [];
        if (value !== undefined)
            reflectionMergePartial<Outpoint>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Outpoint): Outpoint {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated metashrew_runes.Rune runes */ 1:
                    message.runes.push(Rune.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated bytes balances */ 2:
                    message.balances.push(reader.bytes());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Outpoint, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated metashrew_runes.Rune runes = 1; */
        for (let i = 0; i < message.runes.length; i++)
            Rune.internalBinaryWrite(message.runes[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated bytes balances = 2; */
        for (let i = 0; i < message.balances.length; i++)
            writer.tag(2, WireType.LengthDelimited).bytes(message.balances[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message metashrew_runes.Outpoint
 */
export const Outpoint = new Outpoint$Type();
// @generated message type with reflection information, may provide speed optimized methods
class OutpointInput$Type extends MessageType<OutpointInput> {
    constructor() {
        super("metashrew_runes.OutpointInput", [
            { no: 1, name: "txid", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "pos", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<OutpointInput>): OutpointInput {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.txid = new Uint8Array(0);
        message.pos = 0;
        if (value !== undefined)
            reflectionMergePartial<OutpointInput>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: OutpointInput): OutpointInput {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes txid */ 1:
                    message.txid = reader.bytes();
                    break;
                case /* uint32 pos */ 2:
                    message.pos = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: OutpointInput, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bytes txid = 1; */
        if (message.txid.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.txid);
        /* uint32 pos = 2; */
        if (message.pos !== 0)
            writer.tag(2, WireType.Varint).uint32(message.pos);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message metashrew_runes.OutpointInput
 */
export const OutpointInput = new OutpointInput$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PaginationInput$Type extends MessageType<PaginationInput> {
    constructor() {
        super("metashrew_runes.PaginationInput", [
            { no: 1, name: "start", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "end", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<PaginationInput>): PaginationInput {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.start = 0;
        message.end = 0;
        if (value !== undefined)
            reflectionMergePartial<PaginationInput>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PaginationInput): PaginationInput {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 start */ 1:
                    message.start = reader.uint32();
                    break;
                case /* uint32 end */ 2:
                    message.end = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PaginationInput, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 start = 1; */
        if (message.start !== 0)
            writer.tag(1, WireType.Varint).uint32(message.start);
        /* uint32 end = 2; */
        if (message.end !== 0)
            writer.tag(2, WireType.Varint).uint32(message.end);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message metashrew_runes.PaginationInput
 */
export const PaginationInput = new PaginationInput$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RunesOutput$Type extends MessageType<RunesOutput> {
    constructor() {
        super("metashrew_runes.RunesOutput", [
            { no: 1, name: "runes", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Rune }
        ]);
    }
    create(value?: PartialMessage<RunesOutput>): RunesOutput {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.runes = [];
        if (value !== undefined)
            reflectionMergePartial<RunesOutput>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RunesOutput): RunesOutput {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated metashrew_runes.Rune runes */ 1:
                    message.runes.push(Rune.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RunesOutput, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated metashrew_runes.Rune runes = 1; */
        for (let i = 0; i < message.runes.length; i++)
            Rune.internalBinaryWrite(message.runes[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message metashrew_runes.RunesOutput
 */
export const RunesOutput = new RunesOutput$Type();
