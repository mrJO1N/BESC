import { getMatchIndexes } from "../utils/general.utils";
import { Validator } from "./abstract.valid";

export class BFValidator extends Validator {
  private getValidCandidateProgramm(programm: string): string {
    // only ",.[]<>-+" chars
    return programm.replace(/[^><\+\-\[\]\.,]/g, "");
  }

  validate(originProgramm: string): string {
    let programm = this.getValidCandidateProgramm(originProgramm);

    this.checkCharacterQuantity(programm, [["[", "]"]]);
    return programm;
  }
}
