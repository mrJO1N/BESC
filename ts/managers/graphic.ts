import { MemoryManager } from "../besc/main";

export class Graphic extends MemoryManager {
  onCellEqualOne(): void {}
  onEnd(): void {
    console.log("gra end");
  }
  onMemChanged(val?: number, pos?: number): void | number {
    console.log("gra mem ch");
  }
  onMemReaded(pos?: number): void | number {
    console.log("gra mem re");
  }
}
