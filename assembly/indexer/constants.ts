import { IndexPointer } from "metashrew-as/assembly/indexer/tables";

export const RUNESTONE_TAG: u16 = 0x5d6a;
export const OP_RETURN: u8 = 0x6a;

export const GENESIS: u32 = 840000;

// GET RECEIVED BITCOIN
export const HEIGHT_TO_RECEIVED_BTC = IndexPointer.for("/recvbtc/byheight/");

// GET RECEIVED RUNES
export const HEIGHT_TO_RECEIVED_RUNE = IndexPointer.for("/recvrune/byheight/");

// GET BLOCKHASH
export const HEIGHT_TO_BLOCKHASH = IndexPointer.for("/blockhash/byheight/");

// GET HEIGHT
export const BLOCKHASH_TO_HEIGHT = IndexPointer.for("/height/byblockhash/");
export const OUTPOINT_TO_HEIGHT = IndexPointer.for("/height/byoutpoint/");

// GET RUNES
export const OUTPOINT_TO_RUNES = IndexPointer.for("/runes/byoutpoint/");

// GET TXIDS
export const HEIGHT_TO_TRANSACTION_IDS = IndexPointer.for("/txids/byheight");

// RUNES
export const SYMBOL = IndexPointer.for("/runes/symbol/");
export const CAP = IndexPointer.for("/runes/cap/");
export const SPACERS = IndexPointer.for("/runes/spaces/");
export const OFFSETEND = IndexPointer.for("/runes/offset/end/");
export const OFFSETSTART = IndexPointer.for("/runes/offset/start/");
export const HEIGHTSTART = IndexPointer.for("/runes/height/start/");
export const HEIGHTEND = IndexPointer.for("/runes/height/end/");
export const AMOUNT = IndexPointer.for("/runes/amount/");
export const MINTS_REMAINING = IndexPointer.for("/runes/mints-remaining/");
export const PREMINE = IndexPointer.for("/runes/premine/");
export const DIVISIBILITY = IndexPointer.for("/runes/divisibility/");
export const RUNE_ID_TO_HEIGHT = IndexPointer.for("/height/byruneid/");
export const ETCHINGS = IndexPointer.for("/runes/names");
export const RUNE_ID_TO_ETCHING = IndexPointer.for("/etching/byruneid/");
export const ETCHING_TO_RUNE_ID = IndexPointer.for("/runeid/byetching/");
