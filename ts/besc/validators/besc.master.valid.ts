import { Validator } from "./abstract.valid";

export class MasterBESCValidator extends Validator {
  private getValidCandidateProgramm(programm: string): string {
    // only ",.[]<>-+" + "${}()_^`" chars + js regexp /!\d+[+-,.<>{}]/g
    return programm.replace(/[^><\+\-\[\]\.,${}()_^0-9!]/g, "");
  }

  validate(originProgramm: string): string {
    let programm = this.getValidCandidateProgramm(originProgramm);

    this.checkCharacterQuantity(programm, [
      ["[", "]"],
      ["(", ")"],
    ]);

    return programm;
  }
}
