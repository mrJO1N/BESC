import { DynamicEnum } from "./utils/structures";
import { BFI } from "./interpretators/bfi";
import { BESCI } from "./interpretators/besci.master";
import { StdIOManager } from "./generalManagers/stdIO";
import { MemoryManager } from "./generalManagers/memory.manager";
import { IGeneralManagers } from "./interpretators/besci.master";

export const getBfi = () => new BFI(new DynamicEnum());
export const getBesci = (managers: IGeneralManagers = {}) =>
  new BESCI(new DynamicEnum(), { ...managers, stdIO: new StdIOManager() });
export { MemoryManager };
