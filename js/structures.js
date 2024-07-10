export class DynamicEnum {
  /** @api private */
  _mem = {
    // key:val
  };
  /** @api private */
  _lastId = 0;
  /** @api private */
  _Error = class EnumError extends Error {
    constructor(message) {
      super(message);
      this.name = "EnumError";
    }
  };
  /** @param {object.<string|number>} obj */
  constructor(obj) {
    if (!obj) return;
    let keysAndVals = [...Object.keys(obj), ...Object.values(obj)];
    for (let keyOrVal of keysAndVals) {
      if (typeof keyOrVal == "number" && Number.isNaN(keyOrVal))
        throw new _Error(`only strings and numbers. not NaN`);
      if (!["string", "number"].includes(typeof keyOrVal))
        throw new _Error(`only strings and numbers. bad: ${keyOrVal}`);
    }
    this._mem = obj;
  }
  /**
   * return incremented number every call
   * @returns {number}
   * @api private
   */
  _getNewId() {
    return this._lastId++;
  }
  /**
   * add new couple 'key' and 'value' to enum
   * @param {object.<string|number>} param0
   * @returns {DynamicEnum}
   */
  add({ key, val }) {
    if (this._mem[key]) {
      throw new _Error(`Duplicate key '${key}'`);
    }
    this._mem[key] = val;
    return this;
  }
  /**
   *
   * @param {string|number} key
   */
  addKey(key) {
    if (this._mem[key]) {
      throw new _Error(`key ${key} is exist`);
    } else {
      this._mem[key] = "__nul" + this._getNewId();
    }
    return this;
  }
  addValToKey(key, val) {
    if (!this._mem[key]) {
      throw new _Error(`key ${key} is not exist`);
    } else if (!this._mem[key].includes("__nul")) {
      throw new _Error(`val ${val} is added to key ${key}`);
    } else {
      this._mem[key] = val;
    }
  }
  delWithKey(key) {
    if (!this._mem[key]) {
      throw new _Error(`key ${key} is not exist`);
    } else {
      delete this._mem[key];
    }
  }
  delWithVal(val) {
    let indexOfVal = Object.values(this._mem).indexOf(val);
    if (indexOfVal == -1) {
      throw new _Error(`val ${val} is not exist`);
    }
    let key = Object.keys(this._mem)[indexOfVal];
    delete this._mem[key];
  }
  find(keyOrVal) {
    if (this._mem[keyOrVal]) {
      return this._mem[keyOrVal];
    } else {
      let indexOfVal = Object.values(this._mem).indexOf(keyOrVal);
      let key = Object.keys(this._mem)[indexOfVal];
      if (this._mem[key]) {
        return key;
      } else {
        throw new _Error(`do not find ${keyOrVal}`);
      }
    }
  }
  patchWithKey(key, newVal) {
    if (!this._mem[key]) {
      throw new _Error(`key ${key} is not exist`);
    } else {
      this._mem[key] = newVal;
    }
  }
  patchWithVal(val, newKey) {
    let indexOfVal = Object.values(this._mem).indexOf(val);
    let key = Object.keys(this._mem)[indexOfVal];
    if (!this._mem[key]) throw new _Error(`val ${val} is not exist`);
    delete this._mem[key];

    this.add({ key: newKey, val });
  }
  getMemObject() {
    return this._mem;
  }
}
