export interface IDynamicEnum {}

export class DynamicEnum implements IDynamicEnum {
  mem: { [key: number]: number };
  lastId = 0;
  DynEnumError = class EnumError extends Error {
    constructor(message) {
      super(message);
      this.name = "EnumError";
    }
  };

  constructor(obj?: typeof this.mem) {
    this.mem = {};
    if (obj) this.mem = obj;
  }

  private getNewId() {
    return this.lastId++;
  }

  add({ key, val }: { key: number; val: number }) {
    if (this.mem[key]) {
      throw new this.DynEnumError(`Duplicate key '${key}'`);
    }
    this.mem[key] = val;
    return this;
  }

  delWithKey(key: number) {
    if (!this.mem[key]) {
      throw new this.DynEnumError(`key ${key} is not exist`);
    } else {
      delete this.mem[key];
    }
  }

  delWithVal(val: number) {
    let indexOfVal = Object.values(this.mem).indexOf(val);
    if (indexOfVal == -1) {
      throw new this.DynEnumError(`val ${val} is not exist`);
    }

    let key = Object.keys(this.mem)[indexOfVal];
    delete this.mem[key];
  }

  find(keyOrVal: number): number {
    if (this.mem[keyOrVal]) {
      return this.mem[keyOrVal];
    } else {
      let indexOfVal = Object.values(this.mem).indexOf(keyOrVal);
      let key = Object.keys(this.mem)[indexOfVal];
      if (this.mem[key]) {
        return Number(key);
      } else {
        throw new this.DynEnumError(`do not find ${keyOrVal}`);
      }
    }
  }

  patchWithKey(key: number, newVal: number) {
    if (!this.mem[key]) {
      return -1;
    } else {
      this.mem[key] = newVal;
    }
  }
  patchWithVal(val, newKey) {
    let indexOfVal = Object.values(this.mem).indexOf(val);
    let key = Object.keys(this.mem)[indexOfVal];
    if (!this.mem[key]) throw new this.DynEnumError(`val ${val} is not exist`);
    delete this.mem[key];

    this.add({ key: newKey, val });
  }
}
