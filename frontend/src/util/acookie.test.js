//@ts-nocheck
import { describe, it, expect } from "vitest";
import {
  d,
  deleteCookie,
  getCookie,
  hasCookie,
  setCookie,
  updateCookie,
} from "./acookie";
describe("acookie util testing", () => {
  it("setCookie", () => {
    setCookie("token_id", "hellow");
    expect(d.cookie).toStrictEqual("token_id=hellow;");
  });
  it("getCookie", () => {
    // setCookie("token_id", "hellow");
    expect(getCookie("token_id")).toStrictEqual("hellow");
  });
  it("hasCookie", () => {
    expect(hasCookie("token_id")).toBeTruthy();
    expect(hasCookie("token_i")).toBeFalsy();
    expect(hasCookie("oken_i")).toBeFalsy();
  });
  it("updateCookie", () => {
    updateCookie("token_id", "baby");
    expect(getCookie("token_id")).toStrictEqual("baby");
    updateCookie("token_id", "fsfsdfsdfsdfsdfsf");
    expect(getCookie("token_id")).toStrictEqual("fsfsdfsdfsdfsdfsf");
  });
  it("deleteCookie", () => {
    deleteCookie("token_id");
    expect(getCookie("token_id")).toBeUndefined();
  });
});
