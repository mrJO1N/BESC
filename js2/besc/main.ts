import { DynamicEnum } from "./structures";
import { BFI } from "./bfi";
import { BESCI } from "./besci";

export const bfi = new BFI(new DynamicEnum());
export const besci = new BESCI(new DynamicEnum());
