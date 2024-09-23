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

export type TOneTypeObject<T extends string | number> = {
  [key in T]: T;
};
