import { isTypeOf } from "@pso/util/types";

/**
 * @typedef {boolean|string|number} ValidationTypes
 * @typedef {function():void} CatchCallback
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

  /**
   * @param {...object} m
   */
  constructor(...m) {
    super(...m);
    // this.message = `Validating length of ${this.va}:${}`;
    this.name = "ValidationError";
  }
}

export class StringValidation {
  /**
   * @param {string} sample
   */
  constructor(sample) {
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
   * @param {CatchCallback} [catch_callback] - called when validation failed
   * @returns {StringValidation}
   */
  limit(
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    catch_callback = () => {
      throw ValidationError.limitExceeded(`${this.get()}`);
    },
  ) {
    let a = this.get().length;
    if (a < min || a > max) catch_callback();
    return this;
  }

  /** returns true if regex is matched to whole value
   * @param {Array<RegExp>|RegExp} patterns
   * @param {CatchCallback} [catch_callback] - called when validation failed
   * @returns {StringValidation}
   */
  regex(
    patterns,
    catch_callback = () => {
      throw ValidationError.regexFailed(`${this.get()}`);
    },
  ) {
    //@ts-ignore
    if (!isTypeOf(patterns, Array)) patterns = [patterns];
    //@ts-ignore
    for (const r of patterns) if (!r.test(this.get())) catch_callback();
    return this;
  }

  /** check if a string is a email
   * @param {CatchCallback} [catch_callback] - called when validation failed
   */
  email(catch_callback) {
    this.regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
      catch_callback,
    );
    return this;
  }

  /**
   * @param {CatchCallback} [catch_callback] - called when validation failed
   * @returns {StringValidation}
   */
  notEmpty(catch_callback) {
    this.limit(1, null, catch_callback);
    return this;
  }
}

/**
 * @param {any} o
 * @returns {StringValidation|null}
 */
export function validate(o) {
  if (typeof o == "string" || o instanceof String) {
    return new StringValidation(`${o}`);
  } else if (isTypeOf(o, Number)) {
    return null;
  } else {
    return null;
  }
}
