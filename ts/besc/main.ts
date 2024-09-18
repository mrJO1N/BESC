import { DynamicEnum } from "./structures";
import { BFI } from "./bfi";
import { BESCI } from "./besci";
import { BFtoJSCompiler } from "./trans-compiler";
import managers from "./managers/main.manager";

export const bfi = new BFI(new DynamicEnum());
export const besci = new BESCI(new DynamicEnum(), managers);
export const bfCompiler = new BFtoJSCompiler();
