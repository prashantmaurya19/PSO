import React from "react";

/**
 * @property {React.CSSProperties} full_dimension
 * @property {React.CSSProperties} full_w
 * @property {React.CSSProperties} full_h
 * @property {React.CSSProperties} backwardItalic
 * @property {React.CSSProperties} flexCenter
 * @property {React.CSSProperties} debug
 * @property {React.CSSProperties} width_with_scroll
 */
const M = {
  /**
   * @type {React.CSSProperties}
   */
  width_with_scroll: {
    width: "99.21vw",
  },

  /**
   * @type {React.CSSProperties}
   */
  backwardItalic: {
    transform: "rotate(0deg) skew(-30deg, 0deg)",
    WebkitTransform: "rotate(0deg) skew(-30deg, 0deg)",
    MozTransform: "rotate(0deg) skew(-30deg, 0deg)",
    OTransform: "rotate(0deg) skew(-30deg, 0deg)",
    display: "inline-block",
  },

  /**
   * @type {React.CSSProperties}
   */
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /** w 100% h 100%
   */
  full_dimension: {
    width: "100%",
    height: "100%",
  },
  /** w 100%
   */
  full_w: {
    width: "100%",
  },
  /** h 100%
   */
  full_h: {
    height: "100%",
  },
  /**
   * @type {React.CSSProperties}
   */
  debug: {
    outline: "1px solid red",
    background: "rgba(255,255,255,0.1)",
  },
};

export default M;
