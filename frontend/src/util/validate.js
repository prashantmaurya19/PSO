/**
 * @typedef {boolean|string|number} ValidationTypes
 * @typedef {Object.<string,ValidationTypes>} ValidationObject
 */

class ValidationError extends Error {
  /**
   * @param {object} m
   * @param {string} o - operation name
   * @returns {ValidationError}
   */
  static typeMismatch(o, m) {
    return new ValidationError(
      `Validating ${o} of ${m} type ${m.constructor.name} is not possible!`,
    );
  }

  /**
   * @param {object} m
   * @return {ValidationError}
   */
  static regexFailed(m) {
    return new ValidationError(`Regex Failed for ${m}`);
  }

  /**
   * @param {object} m
   */
  static limitExceeded(m) {
    return new ValidationError(`Limit is Exceeded for ${m}!`);
  }

  constructor(m) {
    super(m);
    // this.message = `Validating length of ${this.va}:${}`;
    this.name = "ValidationError";
  }
}

class StringValidation {
  /**
   * @param {Validation} parent
   * @param {String} sample
   */
  constructor(parent, sample) {
    this.parent = parent;
    this.sample = sample;
  }

  /** return value of sample
   * @return {string}
   */
  get() {
    return this.sample;
  }
  /** check length limit
   * @param {number} [min=Number.MIN_SAFE_INTEGER]
   * @param {number} [max=Number.MAX_SAFE_INTEGER]
   * @returns {StringValidation}
   */
  limit(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    let a = this.get().length;
    if (a < min || a > max)
      throw ValidationError.limitExceeded(`${this.get()}`);
    return this;
  }

  /** returns true if regex is matched to whole value
   * @param {...RegExp} pattern
   * @returns {StringValidation}
   */
  regex(...pattern) {
    for (const r of pattern) {
      if (!r.test(this.get()))
        throw ValidationError.regexFailed(`${this.get()}`);
    }
    return this;
  }

  /** check if a string is a email
   * @param {string}
   * @param {StringValidation}
   */
  email() {
    this.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g);
    return this;
  }

  /**
   * @returns {StringValidation}
   */
  notEmpty() {
    this.limit((min = 1));
    return this;
  }

  /**
   * @returns {Validation}
   */
  and() {
    return this.parent;
  }
}

class Validation {
  /**
   * @param {object} o
   * @returns {string}
   */
  #getContructorName(o) {
    return o.constructor.name;
  }
  /** check if o is type name
   * @param {object} o
   * @param {...Function} name - type name
   * @returns {boolean}
   */
  isTypeOf(o, ...name) {
    for (const a of name) {
      if (this.#getContructorName(o) === a.name) return true;
    }
    return false;
  }

  /** check if a object is string or not
   * @param {object} s
   * @returns {boolean}
   */
  isString(s) {
    return this.isTypeOf(s, String);
  }

  /** check object is a number
   * @param {object} s
   * @returns {boolean}
   */
  isNumber(s) {
    return this.isTypeOf(s, Number) && !isNaN(s);
  }

  /** check object is a boolean
   * @param {object} s
   * @returns {boolean}
   */
  isBoolean(s) {
    return this.isTypeOf(s, Boolean);
  }

  /** return value of field
   * @param {string|undefined} name - name of the field in sample
   * @returns {ValidationTypes|ValidationObject}
   */
  get(name) {
    if (name == undefined) return this.sample;
    return this.sample[name];
  }

  /**
   * @param {ValidationObject} o
   */
  constructor(o) {
    this.sample = o;
  }

  /**
   * @param {string} name
   * @returns {StringValidation}
   */
  string(name) {
    if (!this.isString(this.get(name)))
      throw ValidationError.typeMismatch("String", this.get(name));
    return new StringValidation(this, this.get(name));
  }
}

/**
 * @param {ValidationObject} o
 * @returns {Validation}
 */
export function validate(o) {
  return new Validation(o);
}
