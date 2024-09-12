import { besci as runner, bfCompiler as compiler } from "./besc/main";

import bescExamples from "./besc-examples";
import bfExamples from "./bf-examples";

const programms = { ...bescExamples, ...bfExamples };

runner.maxIterationsCount = 10_000_000;
runner.input = "hello";
// runner.programm = programms.echo;
runner.programm = ",[.,]";
runner.run();
console.log(runner.output);

// const compiled = compiler.compile(programms.echo, "hello");

// console.log(String(compiled));
// console.log(compiled());
