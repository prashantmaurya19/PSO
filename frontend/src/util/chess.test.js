import { describe, expect, it, test } from "vitest";
import {
  index2Move,
  fromMove2Index,
  getIndexInfoInAllMotion,
  getAllAttackPiece,
  getPieceAt,
} from "./chess";

describe("chess util testing", () => {
  it("index2move test", () => {
    expect(index2Move(2, 1)).toStrictEqual("c2");
    expect(index2Move(3, 1)).toStrictEqual("d2");
    expect(index2Move(4, 1)).toStrictEqual("e2");
    expect(index2Move(5, 1)).toStrictEqual("f2");
  });

  it("getIndexInfoInAllMotion testing", () => {
    const result = getIndexInfoInAllMotion(
      [3, 0],
      "nr/p2r2pp/4pp2/3p4/4P3/8/PPPP1PPP/RNBQKBN1",
      { diagonal: true },
    );
    expect(result.diagonal).toEqual({});
    expect(result.straight).not.toEqual({});
  });

  it("getAllAttackPiece testing", () => {
    const pos = "R3kbnr/p2r2pp/4pp2/3p4/4P3/8/PPPP1PPP/RNBQKBN1";
    const attack_piece = getAllAttackPiece(
      "b",
      getIndexInfoInAllMotion([3, 0], pos, { diagonal: true, knight: true }),
    );
    const attack_piece2 = getAllAttackPiece(
      "w",
      getIndexInfoInAllMotion([2, 3], pos, {}),
    );
    expect(attack_piece.list).toEqual(["R"]);
    expect(attack_piece2.list).toEqual(["b"]);
  });

  it("getPieceAt testing", () => {
    const piece = getPieceAt(
      0,
      0,
      "R3kbnr/p2r2pp/4pp2/3p4/4P3/8/PPPP1PPP/RNBQKBN1",
    );
    expect(piece).toBe("R");
  });
});
