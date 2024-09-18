import { ArithmeticManager } from "./arithmetic/manager";
import { StdIOManager } from "./stdIO/manager";
import { GraphicalManager } from "./graphical/manager";

const managers = {
  stdIO: new StdIOManager(),
  arithmetic: new ArithmeticManager(),
  graphical: new GraphicalManager(),
};
export default managers;
