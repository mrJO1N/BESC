/**
 *
 * @param {string} BFCode
 *
 */

export default function (BFCode) {
  let bufferSize = 30_000,
    JSCode = `let x=Uint8Array,c=${bufferSize},a=new x(c),b=0,d=Array.from(new TextEncoder().encode(input)),e=[]`;

  BFCode.split("").forEach((key) => {
    switch (key) {
      case "+":
        JSCode += ";a[b]++";
        break;
      case "-":
        JSCode += ";a[b]--";
        break;
      case ">":
        JSCode += ";b++;b%=c";
        break;
      case "<":
        JSCode += ";b+=c-1;b%=c";
        break;
      case "[":
        JSCode += ";while(a[b]){";
        break;
      case "]":
        JSCode += "}";
        break;
      case ",":
        JSCode += ";a[b]=d.shift()||0";
        break;
      case ".":
        JSCode += ";e.push(a[b])";
        break;
    }
  });

  JSCode += ";return new TextDecoder().decode(new x(e).buffer)";

  return new Function("input", JSCode);
}
