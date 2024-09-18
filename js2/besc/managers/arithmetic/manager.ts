import { MemoryManager } from "../memoryBank.manager";

export class ArithmeticManager extends MemoryManager {
  private actions: { [key: number]: (a: number, b: number) => number } = {
    1: (a, b) => a + b,
    2: (a, b) => a - b,
    3: (a, b) => a * b,
    4: (a, b) => a / b,
  };

  onMemReaded(pos?: number): void | number {}
  onMemChanged(val: number, pos?: number): void | number {
    if (pos === 0) {
      let operand1 = this.memory[2];
      let operand2 = this.memory[3];

      let result = this.actions[this.memory[1]](operand1, operand2);

      this.memory[0] = 0;
      this.memory[1] = 0;
      this.memory[2] = result;
      this.memory[3] = 0;

      console.log(result);
      return result;
    }
  }
  onEnd(): void {}
  onCellEqualOne() {}
}
