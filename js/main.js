import { DynamicEnum } from "./structures.js";
import BFInterpretter from "./BrainFuckInterpretter.js";
import bf2js from "./bf2js.js";

/*TODO:
 - to can set input with output=Compiller(input, code)()
 - dyn enum change {start:end} to {"[":[2,6],"]":[4,10]}
 - REFACTORING
 - REVIEW
*/

const examplesBF = {
  /*
  calc,
  helloWorld,
  squares,
   */
  calc: `[<+!8>!10+!7<-]>!5+[<!9+>-]+!6>+[<<!3+[>>[-<]<[>]<-]>>
[>+>]<[<]>]>[[-!4>+!4<]!3>!3+>-]<[!4<]!8<+[-!12>[<+[-!4>+!4<]!5>
]!4<[!5>[!4<+!4>-]!5<-[<<!10+>>-]!3>[<<[<+<<+!3>-]<[>+<-]<++<<+
!6>-]<<[-]<<-<[->>+<-[!3>]>[[<+>-]>+>>]!5<]>[-]>+<<<-[>>+<<-]<]!4<+!8>
[-]>[!3<+!3>-]<<!10+<[->>+<-[!3>]>[[<+>-]>+>>]!5<]>[-]>+>[<<+<+!3>-]!4<
+<+>>[-[-[-[-[-[-[-[-[-<->[-<+<->>]]]]]]]]]]<[!5+[!3<!8+<!8+!4>-]!4<
+<-!4>[>+!3<!9+<-!3>-]!5<[>>+<<-]+<[->-<]>[>>.!4<[+.[-]]>>-]>[>>.<<
-]>[-]>[-]!3>[>>[!8<+!8>-]<<-]]>>[-]!3<[-]!8<]!10+.`,
  helloWorld: `!10+[>+>!3+>!7+>!10+!4<-]!3>++.>+.!7+..!3+.<<++.>!15+.>.!3+.!6-.!8-.<<+.<.
`,
  squares: `++++[>+++++<-]>[<+++++>-]+<+[
    >[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+
    >>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]
    <<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-
]
[Outputs square numbers from 0 to 10000.
Daniel B Cristofani (cristofdathevanetdotcom)
http://www.hevanet.com/cristofd/brainfuck/]
`,
};

const bfCode = `!45+.`,
  input = "";
let output = "";

// output = BFInterpretter(DynamicEnum)
//   .setMaxCalls(8_000)
//   .setInput(input)
//   .exec(examplesBF.squares)
//   .getOutput();

let BFCompiled = bf2js(examplesBF.helloWorld); // run BFCompiled function
output = BFCompiled(input);

console.log(`'${output}'`);
