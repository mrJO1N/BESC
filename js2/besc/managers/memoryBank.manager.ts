export abstract class MemoryManager {
  pointerPosition = 0;
  protected memory = Array(30_000).fill(0);

  getCellWithPos(pos: number) {
    return this.onMemReaded(pos) ?? this.memory[pos];
  }

  get cell(): number {
    return (
      this.onMemReaded(this.pointerPosition) ??
      this.memory[this.pointerPosition]
    );
  }

  set cell(val: number) {
    const onMemChangedResult = this.onMemChanged(val, this.pointerPosition);

    if (!onMemChangedResult) {
      this.memory[this.pointerPosition] = val;
    }
  }

  abstract onEnd(): void;
  abstract onMemChanged(val?: number, pos?: number): void | number;

  abstract onMemReaded(pos?: number): void | number;
}
