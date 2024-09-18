import { getBesci } from "./besc/main";
import { Graphic } from "./managers/graphic";

const runner = getBesci({ graphic: new Graphic() });

runner.programm = "!64+.$,.";
runner.run();
console.log(runner.output);
