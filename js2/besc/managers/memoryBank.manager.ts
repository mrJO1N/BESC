export abstract class MemoryManager {
  pointerPosition = 0;
  protected memory: number[] = new Proxy(Array(30_000).fill(0), {
    set(target: number[], prop: string | symbol, newValue: number) {
      target[prop] = newValue;
      return true;
    },
  });

  get cell(): number {
    return this.memory[this.pointerPosition];
  }

  set cell(val: number) {
    this.memory[this.pointerPosition] = val;
  }

  abstract onEnd(): void;
  abstract onMemChanged(): void;
}
