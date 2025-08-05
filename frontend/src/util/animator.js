import { StorageManager } from "./config";
import gsap from "gsap";

const anime = {
  "main.open": function () {
    return [
      gsap.from("#main-left-chess_board", {
        x: -800,
        opacity: 0,
        duration: 1,
      }),
      gsap.from(".main-right", {
        x: 800,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      }),
    ];
  },
  "main.close": function () {
    return [
      gsap.to("#main-left-chess_board", {
        x: -800,
        opacity: 0,
        duration: 1,
      }),
      gsap.to(".main-right", {
        x: 800,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      }),
    ];
  },
  "nav-button-close": function (id) {
    return gsap.to(id, {
      width: 0,
      opacity: 0,
      margin: 0,
      padding: 0,
      display: "none",
      duration: 0.8,
    });
  },
  "login-form-close": function (container, field) {
    const tl = gsap.timeline();
    return tl
      .to(field, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.16,
      })
      .to(container, {
        boxShadow: `0px 0px 0px 0px ${getComputedStyle(document.documentElement).getPropertyValue("--color-index-third")}`,
        duration: 0.5,
      });
  },
  "login-form-open": function (container, field) {
    const tl = gsap.timeline();
    return tl
      .to(container, {
        boxShadow: `0px 0px 10px 1px ${getComputedStyle(document.documentElement).getPropertyValue("--color-index-third")}`,
        duration: 0.5,
      })
      .from(field, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.16,
      });
  },
};

export const animation = new StorageManager(anime);

/**
 * @typedef {"main.close"|"main.open"|"login.open"|"login.close"|"nav-button-close"|"login-form-open"|"login-form-close"} AnimationLitrals
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
export function getAnimation(key, ...args) {
  return new AnimationHelper(animation.get(key)(...args));
}
