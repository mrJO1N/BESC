export interface IRunnerCommands {
  [key: string]: IRunnerStepFunc;
}

export type IRunnerStepFunc = (
  commandIndex: number,
  pointer: number,
  lastInputCharPointer: number
) => {
  commandIndex: number;
  pointer: number;
  lastInputCharPointer: number;
  isStoped?: boolean;
};
