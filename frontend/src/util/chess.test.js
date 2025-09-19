import { describe, expect, it } from "vitest";
import {
  index2Move,
  fromMove2Index,
  getIndexInfoInAllMotion,
  getPieceAt,
  getEmptyFenInfo,
  parse,
  IndexCoordinator,
  ChessNotation,
  InspectPiece,
} from "./chess";
import { setLogging } from "./log";

describe("chess util testing", () => {
  setLogging(false);
  it("index2move test", () => {
    expect(index2Move(2, 1)).toStrictEqual("c2");
    expect(index2Move(3, 1)).toStrictEqual("d2");
    expect(index2Move(4, 1)).toStrictEqual("e2");
    expect(index2Move(5, 1)).toStrictEqual("f2");
  });
  it("index2move test", () => {
    expect(
      IndexCoordinator.fromBoardCellIndexToChessNotationIndex([2, 6]),
    ).toStrictEqual("c2");
    expect(
      IndexCoordinator.fromBoardCellIndexToChessNotationIndex([3, 6]),
    ).toStrictEqual("d2");
    expect(
      IndexCoordinator.fromBoardCellIndexToChessNotationIndex([4, 6]),
    ).toStrictEqual("e2");
    expect(
      IndexCoordinator.fromBoardCellIndexToChessNotationIndex([5, 6]),
    ).toStrictEqual("f2");
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
      InspectPiece.isCheckMate(
        [4, 0],
        parse("rnbqkbnr/ppp1p1pp/3N1p2/7Q/8/4P3/PPPP1PPP/RNB1KB1R b - - 0 1"),
      ),
    ).toBeFalsy();
    expect(
      InspectPiece.isCheckMate(
        [4, 0],
        parse("rnbqkbnr/ppppp1pp/3N1p2/7Q/8/4P3/PPPP1PPP/RNB1KB1R b - - 0 1"),
      ),
    ).toBeTruthy();
    expect(
      InspectPiece.isCheckMate(
        [4, 0],
        parse("rnbqkbnr/ppppp1pp/5p2/7Q/8/4P3/PPPP1PPP/RNB1KBNR b - - 0 1"),
      ),
    ).toBeFalsy();
    expect(
      InspectPiece.isCheckMate(
        [4, 0],
        parse("R3kbnr/pppp1ppp/4p3/8/8/BP6/P1PPPPPP/RN1QKBN1 b - - 91 1"),
      ),
    ).toBeTruthy();
    expect(
      InspectPiece.isCheckMate(
        [4, 0],
        parse("R3kbnr/pppp1ppp/4p3/8/8/8/PPPPPPPP/RNBQKBN1 b - - 0 1"),
      ),
    ).toBeFalsy();
    expect(
      InspectPiece.isCheckMate(
        [4, 0],
        parse("R3kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN1 b - - 0 1"),
      ),
    ).toBeTruthy();
    expect(
      InspectPiece.isCheckMate(
        [4, 0],
        parse("R3kbnr/3qpppp/8/8/Q7/8/1P1PPPPP/1NB1KBNR b KQkq - 0 1"),
      ),
    ).toBeTruthy();

    setLogging(true);
    expect(
      InspectPiece.isCheckMate(
        [4, 0],
        parse(
          "rnbqkbr1/pp1p1Qpp/2p2n2/4p1N1/4P3/8/PPPP1PPP/RNB1KB1R b kqKQ - 5 5",
        ),
      ),
    ).toBeTruthy();
    setLogging(false);
    //
  });

  it("genarate chess Notation testing", () => {
    expect(
      ChessNotation.getChessNotation(
        [1, 5],
        [3, 4],
        parse("rnbqkbnr/pppppppp/8/8/8/1N3N2/PPPPPPPP/R1BQKB1R w KQkq - 0 1"),
        // @ts-ignore
        { check: false, checkmate: false, capture: false },
      ),
    ).toStrictEqual("Nbd4");
  });
});
