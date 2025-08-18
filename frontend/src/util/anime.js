/**
 * this utility is create because of unsatisfactory result by the animator.js
 * animator.js lack costomization and combination with diffrent parts
 */

import gsap from "gsap";

/**
 * @typedef {"from"|"to"} AnimationDirectionLiterals
 */

/**
 * @typedef {object} AnimationObject
 * @property {AnimationDirectionLiterals} direction
 * @property {gsap.TweenVars} animation
 * @property {string|HTMLElement|gsap.TweenTarget} e
 */

/**
 * @typedef {Array.<AnimationObject>} AnimationTimeline
 */

/**
 * @typedef {Array.<AnimationObject|AnimationTimeline>} AnimationBlock
 * @typedef {Array.<AnimationBlock>} AnimationExecutionList
 */

/** get last element
 * @param {Array} arr
 */
function getLastElement(arr) {
  return arr[arr.length - 1];
}

class AnimateState {
  static NORMAL = "initial";
  static TIMELINE = "timeline";
}

class AnimeHandler {
  constructor() {
    this.testing = false;
    this.current_state = AnimateState.NORMAL;
    /**
     * @type {AnimationExecutionList}
     */
    this.animations = [[]];
  }

  /**
   * @type {AnimationExecutionList}
   */
  get() {
    return this.animations;
  }

  /**
   * @param {AnimationObject} e
   */
  pushIntoTimeline(e) {
    if (
      this.current_state != AnimateState.TIMELINE ||
      !Array.isArray(
        this.animations[this.animations.length - 1][
          this.animations[this.animations.length - 1].length - 1
        ],
      )
    )
      throw TypeError(
        `push object in timeline , when it is not present current_state : ${this.current_state} pushpoint :${
          this.animations[this.animations.length - 1]
        }`,
      );
    getLastElement(getLastElement(this.animations)).push(this.testing ? 0 : e);
  }

  /**
   * @param {AnimationObject|AnimationTimeline} e
   */
  push(e) {
    getLastElement(this.animations).push(
      this.testing && !Array.isArray(e) ? 0 : e,
    );
  }

  /**
   * @param {string} state
   */
  setState(state) {
    this.current_state = state;
  }

  /**
   * @returns {string}
   */
  getState() {
    return this.current_state;
  }

  /**
   * @param {AnimationObject} e
   */
  handleAnimation(e) {
    switch (this.getState()) {
      case AnimateState.NORMAL: {
        this.push(e);
        break;
      }
      case AnimateState.TIMELINE: {
        this.pushIntoTimeline(e);
        break;
      }
      default: {
        throw new TypeError(
          `handleAnimation does not support ${this.getState()} state!`,
        );
      }
    }
  }

  /**
   * add or remove a timeline in AnimationBlock
   * @param {"start"|"end"} o
   */
  handleTimeLine(o) {
    if (this.getState() == AnimateState.NORMAL && o == "start") {
      this.push([]);
      this.setState(AnimateState.TIMELINE);
    } else if (this.getState() == AnimateState.TIMELINE && o == "end") {
      this.setState(AnimateState.NORMAL);
    } else {
      throw new TypeError(
        `handleTimeLine does not support ${this.getState()} state!`,
      );
    }
  }

  addNewAnimationBlock() {
    this.animations.push([]);
  }
}

class AnimeExecutor {
  /**
   * @param {AnimationObject} e
   * @param {gsap.core.Timeline|null} tl
   * @returns {gsap.core.Tween|gsap.core.Timeline}
   */
  static executeAnimationObject(e, tl) {
    let g = tl == null ? gsap : tl;
    if (e.direction == "to") {
      if (tl == null) return g.to(e.e, e.animation);
      g = g.to(e.e, e.animation);
    } else if (e.direction == "from") {
      if (tl == null) return g.from(e.e, e.animation);
      g = g.from(e.e, e.animation);
    }
    return g;
  }

  /**
   * @param {AnimationTimeline} tl
   * @returns {gsap.core.Timeline}
   */
  static async executeTimeline(tl) {
    let t = gsap.timeline();
    for (const a of tl) {
      t = AnimeExecutor.executeAnimationObject(a, t);
    }
    return t;
  }

  /**
   * @param {AnimationBlock} e
   * @returns {Array.<gsap.core.Tween|gsap.core.Timeline>}
   */
  static executeBlock(e) {
    const res = [];
    for (const obj of e) {
      res.push(
        Array.isArray(obj)
          ? AnimeExecutor.executeTimeline(obj)
          : AnimeExecutor.executeAnimationObject(obj),
      );
    }
    return res;
  }

  /**
   * @param {AnimationExecutionList} animation
   */
  static async execute(animation) {
    for (const block of animation) {
      await Promise.all(AnimeExecutor.executeBlock(block));
    }
  }
}

class Anime {
  #anime_handler = new AnimeHandler();
  constructor() {}

  /**
   * @returns {AnimationExecutionList}
   */
  peek() {
    return this.#anime_handler.get();
  }

  /**
   * @returns {Promise}
   */
  build() {
    return AnimeExecutor.execute(this.peek());
  }

  /**
   * @returns {Anime}
   */
  and() {
    this.#anime_handler.addNewAnimationBlock();
    return this;
  }

  /**
   * @returns {Anime}
   */
  timeline() {
    this.#anime_handler.handleTimeLine("start");
    return this;
  }

  /**
   * @returns {Anime}
   */
  endTimeline() {
    this.#anime_handler.handleTimeLine("end");
    return this;
  }

  /**
   * log warning if animation object is used
   */
  #handleAnimationObjectUse(animation) {
    if (animation == null) return;

    console.warn(
      "Please not pass animation object . Make a new animation function in animation class [Note in source code]",
      animation,
    );
  }
  /** handle the conflicts between animation objects
   * @param {gsap.TweenVars} d - default object
   * @param {gsap.TweenVars|undefined} u - extra property defind by user
   * @returns {gsap.TweenVars}
   */
  #handleAnimationObject(d, u) {
    this.#handleAnimationObjectUse(u);
    return { ...d, ...(u == null ? {} : u) };
  }

  /**
   * @param {AnimationDirectionLiterals} direction
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} animation - animation object
   * @returns {Anime}
   */
  mainLeftChessBoard(direction, e, animation) {
    this.#anime_handler.handleAnimation({
      e,
      direction,
      animation: this.#handleAnimationObject(
        {
          x: -800,
          opacity: 0,
          duration: 1,
        },
        animation,
      ),
    });
    return this;
  }

  /**
   * @param {AnimationDirectionLiterals} direction
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} animation - animation object
   * @returns {Anime}
   */
  mainRightSlogan(direction, e, animation) {
    this.#anime_handler.handleAnimation({
      e,
      direction,
      animation: this.#handleAnimationObject(
        {
          x: 800,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
        },
        animation,
      ),
    });
    return this;
  }

  /**
   * @param {AnimationDirectionLiterals} direction
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} animation - animation object
   * @returns {Anime}
   */
  navButton(direction, e, user_animation) {
    this.#anime_handler.handleAnimation({
      e,
      direction,
      animation: this.#handleAnimationObject(
        {
          width: 0,
          opacity: 0,
          margin: 0,
          padding: 0,
          display: "none",
          duration: 0.8,
        },
        user_animation,
      ),
    });
    return this;
  }

  /**
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} animation - animation object
   * @returns {Anime}
   */
  formContainerHide(e, user_animation) {
    try {
      this.#anime_handler.handleAnimation({
        direction: "to",
        e,
        animation: this.#handleAnimationObject(
          {
            boxShadow: `0 0 0 0 ${getComputedStyle(document.documentElement).getPropertyValue("--color-index-third")}`,
            duration: 0.5,
          },
          user_animation,
        ),
      });
      return this;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} user_animation - animation object
   * @returns {Anime}
   */
  formContainerShow(e, user_animation) {
    try {
      this.#anime_handler.handleAnimation({
        direction: "to",
        e,
        animation: this.#handleAnimationObject(
          {
            boxShadow: `0px 0px 10px 1px ${getComputedStyle(document.documentElement).getPropertyValue("--color-index-third")}`,
            duration: 0.5,
          },
          user_animation,
        ),
      });
    } catch {}
    return this;
  }

  /**
   * @param {AnimationDirectionLiterals} direction
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} animation - animation object
   * @returns {Anime}
   */
  formFieldAll(direction, e, user_animation) {
    this.#anime_handler.handleAnimation({
      e,
      direction,
      animation: this.#handleAnimationObject(
        {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.16,
        },
        user_animation,
      ),
    });
    return this;
  }

  /**
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} animation - animation object
   * @returns {Anime}
   */
  selfContainedLoaderShow(e = ".SelfContainedLoader", user_animation) {
    this.#anime_handler.handleAnimation({
      e,
      direction: "to",
      animation: this.#handleAnimationObject(
        {
          opacity: 1,
          zIndex: 10,
        },
        user_animation,
      ),
    });
    return this;
  }

  /**
   * @param {gsap.TweenTarget} e - target element for animation
   * @param {gsap.TweenVars} animation - animation object
   * @returns {Anime}
   */
  selfContainedLoaderHide(e = ".SelfContainedLoader", user_animation) {
    this.#anime_handler.handleAnimation({
      e,
      direction: "to",
      animation: this.#handleAnimationObject(
        {
          opacity: 0,
          zIndex: 0,
        },
        user_animation,
      ),
    });
    return this;
  }
}

/**
 * @returns {Anime}
 */
export function anime() {
  return new Anime();
}
