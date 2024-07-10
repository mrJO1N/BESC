export default function Interpretter(DynamicEnum) {
  return {
    output: "",
    input: "",
    _Error: class extends Error {
      constructor(message) {
        super(message);
        this.name = "InterpretErrors";
      }
    },

    setInput(input) {
      this.input = input;
      return this;
    },

    setMaxCalls(num) {
      this.maxCalls = num;
      return this;
    },

    _getMatchIndexes(str, regexp) {
      const matches = [...String(str).matchAll(regexp)];
      let matchesIndexes = [];

      for (let i in matches) {
        matchesIndexes.push(matches[i].index);
      }
      return matchesIndexes;
    },

    _getBreacketsMap(code) {
      const map = new DynamicEnum();
      const startMatches = this._getMatchIndexes(code, /\[/dg),
        endMatches = this._getMatchIndexes(code, /\]/dg);

      if (!startMatches || !endMatches) {
        console.log("'[' or ']' is not exist");
      }
      if (startMatches.length != endMatches.length) {
        console.log("quantity of '[' and ']' is different");
      }
      for (let i = 0; i < startMatches.length; i++) {
        map.add({ key: startMatches[i], val: endMatches[i] });
      }
      return map;
    },

    _getValidCode(code) {
      // to includes only brainfuck code.
      for (let i = 0; i < code.length; i++) {
        if (!",.<>+-[]1234567890!".includes(code[i])) {
          code = code.replace(code[i], "");
          i--;
        }
      }

      const errorMsgs = [];

      //
      //
      //
      //
      //

      let errorMsg = "";
      errorMsgs.forEach((el) => (errorMsg += `( ${el.toString()} ),`));
      if (errorMsg) throw new this._Error(errorMsg);
      return code;
    },

    exec(code) {
      code = this._getValidCode(code);
      if (code.errorMsg) return;

      const maxCalls = this.maxCalls ?? code.length * this.input * 1.5,
        breacketsMap = this._getBreacketsMap(code);
      let isEnd = false,
        commandsCounter = 0,
        setNotTurbo = () => {
          prevCommandsTurbo = "";
          isTurbo = false;
        };
      let prevCommandsTurbo = "",
        isTurbo = false;

      const mem = new Array(30_000).fill(0);
      let pointer = 0,
        commandIndex = 0,
        lastInputCharPointer = 0;

      while (!isEnd) {
        if (commandsCounter > maxCalls) {
          isEnd = true;
          break;
        }
        let command = code[commandIndex];

        switch (command) {
          case "!":
            isTurbo = true;
            break;
          case ">":
            pointer += Number(prevCommandsTurbo) || 1;
            if (pointer > 30_000) pointer = 0;
            setNotTurbo();
            break;

          case "<":
            pointer -= Number(prevCommandsTurbo) || 1;
            if (pointer < 0) pointer = 0;
            setNotTurbo();
            break;

          case "+":
            mem[pointer] += Number(prevCommandsTurbo) || 1;
            if (mem[pointer] > 256) mem[pointer] = 0;
            setNotTurbo();
            break;

          case "-":
            mem[pointer] -= Number(prevCommandsTurbo) || 1;
            if (mem[pointer] < 0) mem[pointer] = 0;
            setNotTurbo();
            break;

          case ".":
            this.output += String.fromCharCode(mem[pointer]).repeat(
              Number(prevCommandsTurbo) || 1
            );
            setNotTurbo();
            break;

          case ",":
            for (let i of Array(Number(prevCommandsTurbo) || 1)) {
              let charCode = String(this.input).charCodeAt(
                lastInputCharPointer++
              );
              if (Number.isNaN(charCode)) {
                mem[pointer] = 0;
              } else {
                mem[pointer] = charCode;
              }
            }
            setNotTurbo();
            break;

          case "[":
            if (mem[pointer] == 0) {
              commandIndex = breacketsMap.find(commandIndex);
            }
            break;

          case "]":
            commandIndex = breacketsMap.find(commandIndex) - 1;
            break;
          case !Number.isNaN(Number(command)) ? command : "0":
            if (isTurbo) {
              prevCommandsTurbo += command;
            }
            break;
          default:
            isEnd = true;
        }
        console.log(
          JSON.stringify(
            { command, commandIndex, pointer, val: mem[pointer] },
            undefined,
            2
          )
        );
        commandIndex++;
        commandsCounter++;
      }

      return this;
    },

    getOutput() {
      return this.output;
    },
  };
}
