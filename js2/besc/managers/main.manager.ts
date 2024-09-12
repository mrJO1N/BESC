import { ArithmeticManager } from "./arithmetic/manager";
import { StdIOManager } from "./stdIO/manager";

const managers = {
  stdIO: new StdIOManager(),
  arithmetic: new ArithmeticManager(),
};
export default managers;
