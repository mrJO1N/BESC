import { besci as runner } from "./besc/main";

const bfProgramms: { [key: string]: string } = {
  echo: ",[.,]",
  cat_buffer: ",[>,]<[<]>[.>]",
  fib: ">++++++++++>+>+[[+++++[>++++++++<-]>.<++++++[>--------<-]+<<<]>.>>[[-]<[>+<-]>>[<<+>+>-]<[>+<-[>+<-[>+<-[>+<-[>+<-[>+<-[>+<-[>+<-[>+<-[>[-]>+>+<<<-[>+<-]]]]]]]]]]]+>>>]<<<]",
};

const besciProgramms: { [key: string]: string } = {
  addictTest: "!100+^!33+`.",
  chainsTest: "(",
  memTest: "",
};

runner.maxIterationsCount = 10_000;
runner.input = "hello";
runner.programm = besciProgramms.addictTest;
runner.run();
console.log(runner.output);
