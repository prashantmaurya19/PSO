import { describe, expect, it } from "vitest";
import { reverse } from "./astring";

describe("astring testes", () => {
  it("reverse method test", () => {
    expect(reverse("prashant")).toStrictEqual("tnahsarp");
    expect(reverse("expect(reverse('prashant')).toStrictEqual")).toStrictEqual(
      "lauqEtcirtSot.))'tnahsarp'(esrever(tcepxe",
    );
  });
});
