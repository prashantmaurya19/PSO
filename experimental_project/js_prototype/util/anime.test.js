import { describe, expect, it } from "vitest";
import { anime } from "./anime";

/**
 * @type {Array.<String>}
 */
const AnimationObjectProperties = ["direction", "e", "animation"];

/** check object is a AnimationObject
 * @param {import("./anime").AnimationObject} o
 * @returns {boolean}
 */
function isAnimationObject(o) {
  if (!(o.direction == "from" || o.direction == "to")) return false;
  for (const k of AnimationObjectProperties) {
    if (o[k] == undefined) return false;
  }
  return true;
}

describe("Animation managment testing", () => {
  it("a simple test", () => {
    const a = anime().mainRightSlogan("from").mainLeftChessBoard("from").peek();
    expect(Array.isArray(a)).toBeTruthy();
    expect(Array.isArray(a[a.length - 1])).toBeTruthy();
    expect(a[a.length - 1][1]).toBeTruthy(isAnimationObject((a[a.length - 1][1])));
    expect(a[a.length - 1][0]).toBeTruthy(isAnimationObject((a[a.length - 1][0])));
    expect(a[a.length - 1][2]).toBeUndefined();
  });
  it("test timeline", () => {
    const a = anime()
      .navButton()
      .mainLeftChessBoard("from")
      .timeline()
      .mainRightSlogan("to")
      .endTimeline()
      .navButton("from")
      .peek();
    expect(Array.isArray(a)).toBeTruthy();
    expect(Array.isArray(a[0])).toBeTruthy();
    expect(a[1]).toBeUndefined();
    expect(a[0][0]).toBeTruthy(isAnimationObject(a[0][0]));
    expect(a[0][1]).toBeTruthy(isAnimationObject(a[0][1]));
    expect(a[0][2][0]).toBeTruthy(isAnimationObject(a[0][2][0]));
    expect(a[0][3]).toBeTruthy(isAnimationObject(a[0][3]));
    expect(Array.isArray(a[0][2])).toBeTruthy();
    expect(a[0][2][1]).toBeUndefined();
    expect(a[0][4]).toBeUndefined();
  });
});
