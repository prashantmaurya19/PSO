import { describe, expect, it } from "vitest";
import { StorageManager } from "./config";
const v = "test";
const anime = {
  "main.open": function () {
    return [v, v];
  },
  "main.close": function () {
    return [v, v];
  },
  "nav-button-close": function (id) {
    return v;
  },
  "login-form-close": function (container, field) {
    return v;
  },
  "login-form-open": function (container, field) {
    return v;
  },
};

const animation = new StorageManager(anime);

/**
 * @typedef {"main.close"|"main.open"|"nav-button-close"|"login-form-open"|"login-form-close"} AnimationLitrals
 */

class AnimationHelper {
  constructor(v) {
    this.animations = v;
  }

  /**
   * @param {AnimationLitrals} key
   * @param {...object} args
   * @returns {AnimationHelper}
   */
  with(key, ...args) {
    if (this.animations == null) this.animations = [];
    else if (!(this.animations instanceof Array)) {
      const t = this.animations;
      this.animations = [t];
    }
    this.animations[
      animation.get(key)(...args) instanceof Array ? "concat" : "push"
    ](animation.get(key)(...args));
    return this;
  }

  /**
   * @returns {Promise}
   */
  get() {
    return this.animations;
  }
}

/** get animation
 * @param {AnimationLitrals} key - name of animation
 * @returns {AnimationHelper}
 */
function getAnimation(key, ...args) {
  return new AnimationHelper(animation.get(key)(...args));
}

describe("Animation managment testing", () => {
  it("tesing with function", () => {
    expect(
      getAnimation("main.open")
        .with("login-form-close")
        .with("login-form-open")
        .get(),
    ).toHaveLength(4);
  });
  it("tesing get function", () => {
    expect(getAnimation("login-form-open").get()).toBe(v);
  });
  it("tesing get function", () => {
    expect(getAnimation("login-form-open").with("login-form-close").get()).toHaveLength(
      2
    );
  });
});
