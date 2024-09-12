import { MemoryManager } from "../memoryBank.manager";

export class ArithmeticManager extends MemoryManager {
  onEnd(): void {}
  onMemChanged(): void {
    console.log("hello from ArithmeticManager memChanged");
  }
}
