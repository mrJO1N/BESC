import { besci as runner, bfCompiler as compiler } from "./besc/main";

import bescExamples from "./besc-examples";
import bfExamples from "./bf-examples";

const programms = { ...bescExamples, ...bfExamples };

for (const programmName in programms) {
  programms[programmName] = String(programms[programmName]).replace(/\s/g, "");
}

runner.maxIterationsCount = 100_000;
runner.input = "hello";
runner.programm = programms.memTest;
// runner.programm = ",[.,]";
runner.run();
console.log(runner.output);

// const compiled = compiler.compile(programms.echo, "hello");

// console.log(String(compiled));
// console.log(compiled());
