import { describe, expect, it } from "vitest";
import {
  index2Move,
  fromMove2Index,
  getIndexInfoInAllMotion,
  getAllAttackPiece,
  getPieceAt,
  isCheckMate,
  getEmptyFenInfo,
  parse,
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

  it("isCheckMate testing", () => {
    expect(
      isCheckMate(
        [4, 0],
        parse("rnbqkbnr/ppp1p1pp/3N1p2/7Q/8/4P3/PPPP1PPP/RNB1KB1R b - - 0 1"),
      ),
    ).toBeFalsy();
    expect(
      isCheckMate(
        [4, 0],
        parse("rnbqkbnr/ppppp1pp/3N1p2/7Q/8/4P3/PPPP1PPP/RNB1KB1R b - - 0 1"),
      ),
    ).toBeTruthy();
    expect(
      isCheckMate(
        [4, 0],
        parse("rnbqkbnr/ppppp1pp/5p2/7Q/8/4P3/PPPP1PPP/RNB1KBNR b - - 0 1"),
      ),
    ).toBeFalsy();
    expect(
      isCheckMate(
        [4, 0],
        parse("R3kbnr/pppp1ppp/4p3/8/8/BP6/P1PPPPPP/RN1QKBN1 b - - 0 1"),
      ),
    ).toBeTruthy();
    expect(
      isCheckMate(
        [4, 0],
        parse("R3kbnr/pppp1ppp/4p3/8/8/8/PPPPPPPP/RNBQKBN1 b - - 0 1"),
      ),
    ).toBeFalsy();
    expect(
      isCheckMate(
        [4, 0],
        parse("R3kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN1 b - - 0 1"),
      ),
    ).toBeTruthy();
  });
});
