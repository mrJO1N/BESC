import { getMatchIndexes } from "../utils/general.utils";

export abstract class Validator {
  protected ValidationError = class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValidationError";
    }
  };

  protected checkCharacterQuantity(
    programm: string,
    inEqualQuantityChars: string[][]
  ): void {
    for (const mustEqualQuantityChars of inEqualQuantityChars) {
      const [start, end] = mustEqualQuantityChars;

      const startMatches = getMatchIndexes(
        programm,
        new RegExp("\\" + start, "g")
      );

      const endMatches = getMatchIndexes(programm, new RegExp("\\" + end, "g"));

      if (startMatches.length !== endMatches.length) {
        throw new this.ValidationError(
          `Mismatched count of chars '${start}' and '${end}'.`
        );
      }
    }
  }

  abstract validate(program: string): string;
}
