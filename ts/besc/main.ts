import { DynamicEnum } from "./utils/structures";
import { BFI } from "./interpretators/bfi";
import { BESCI } from "./interpretators/besci.master";
import { StdIOManager } from "./generalManagers/stdIO";
import { MemoryManager } from "./generalManagers/memory.manager";
import { IGeneralManagers } from "./interpretators/besci.master";
import { BFValidator } from "./validators/bf.valid";
import { MasterBESCValidator } from "./validators/besc.master.valid";

export const getBfi = () => new BFI(new DynamicEnum(), new BFValidator());
export const getBesci = (managers: IGeneralManagers = {}) =>
  new BESCI(new DynamicEnum(), new MasterBESCValidator(), {
    ...managers,
    stdIO: new StdIOManager(),
  });
export { MemoryManager };
