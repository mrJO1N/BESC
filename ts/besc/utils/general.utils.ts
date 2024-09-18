import { DynamicEnum } from "./structures";
function getMatchIndexes(str: string, regexp: RegExp): number[] {
  const matches = [...String(str).matchAll(regexp)];
  let matchesIndexes: number[] = [];

  for (let i in matches) {
    matchesIndexes.push(matches[i].index);
  }
  return matchesIndexes;
}

export function getBreacketsMap(
  programm: string,
  startPattern: RegExp,
  endPattern: RegExp
): DynamicEnum {
  const map = new DynamicEnum();
  const startMatches = getMatchIndexes(programm, startPattern),
    endMatches = getMatchIndexes(programm, endPattern);

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
}
