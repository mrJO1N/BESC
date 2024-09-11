export interface IRunner {
  readonly output: string;
  programm: string;
  input: string;
  run(): void;
}

export type IRunnerStepFunc = (
  commandIndex: number,
  pointer: number,
  lastInputCharPointer: number
) => {
  isWorked: boolean;
  commandIndex: number;
  pointer: number;
  lastInputCharPointer: number;
};
