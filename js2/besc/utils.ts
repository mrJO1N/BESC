export function getMatchIndexes(str: string, regexp: RegExp): number[] {
  const matches = [...String(str).matchAll(regexp)];
  let matchesIndexes: number[] = [];

  for (let i in matches) {
    matchesIndexes.push(matches[i].index);
  }
  return matchesIndexes;
}
