import { createSlice } from "@reduxjs/toolkit";
import { combine } from "@pso/util/aobject";
import { CHESS_NOTATION_CHECKMATE_CHAR } from "@pso/util/chess";
import { emit } from "@pso/util/event";
import { act } from "react";

const initialState = {
  // NOTE i want to rename chess_board to chess_arena
  // but due to multiple usage i leaving it as it is
  chess_board: {
    self: {
      display: true,
      position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    },
    /**
     * @type {{time_decrement_in_interval:number,duration:import("@pso/util/time").DurationCache|undefined}&Record<import("../chess-data").PlayerType,{clock:import("@pso/util/time").MiliSecond}>}
     */
    clock_info_panel: {
      p: { clock: 0 },
      o: { clock: 0 },
      duration: undefined,
      time_decrement_in_interval: -100,
    },
    promotion_piece_overlay: {
      display: false,
      promotion_index: null,
    },
    game_winner_banner_overlay: {
      display: false,
      piece: "K",
      color: "w",
      text: "demo are winner",
    },
    loader: {
      display: false,
    },
  },
  move_list_panel: {
    display: true,
    /**
     * @type {Array<import("@pso/util/chess").ChessMoveNotation>}
     */
    move_list: [],
    request: { title: "demo question?" },
  },
  debug: {
    fen_overlay: {
      display: true,
    },
    duration_overlay: {
      display: true,
    },
  },
};

export const componentDataSlice = createSlice({
  name: "component-data",
  initialState,
  reducers: {
    pushChessNotationToMoveList(state, action) {
      state.move_list_panel.move_list.push(action.payload);
    },
    updateGameWinnerBannerOverlay(state, action) {
      state.chess_board.game_winner_banner_overlay = combine(
        state.chess_board.game_winner_banner_overlay,
        action.payload,
      );
    },
    updateChessBoardDuration(state, action) {
      state.chess_board.clock_info_panel.duration = action.payload;
      state.chess_board.clock_info_panel.o.clock =
        state.chess_board.clock_info_panel.duration.time;
      state.chess_board.clock_info_panel.p.clock =
        state.chess_board.clock_info_panel.duration.time;
    },
    changeChessBoardPlayerClockTime(state, action) {
      // state.players_data[state.turn].clockTime += action.payload;
      state.chess_board.clock_info_panel[action.payload.turn].clock +=
        action.payload.duration;
    },
    updateChessBoard(state, action) {
      state.chess_board.self = combine(state.chess_board.self, action.payload);
      // updateState(state, "chess_board");
    },
    updatePromotionPieceOverlay(state, action) {
      state.chess_board.promotion_piece_overlay = combine(
        state.chess_board.promotion_piece_overlay,
        action.payload,
      );
      // updateState(state, "chess_board");
    },
    updateChessBoardFindOponentLoader(state, action) {
      state.chess_board.loader = action.payload;
    },
    updateDebugFenOverlay(state, action) {
      state.debug.fen_overlay = combine(
        state.debug.fen_overlay,
        action.payload,
      );
    },
  },
});

export const {
  updateChessBoard,
  updatePromotionPieceOverlay,
  updateChessBoardFindOponentLoader,
  updateGameWinnerBannerOverlay,
  pushChessNotationToMoveList,
  updateDebugFenOverlay,
  updateChessBoardDuration,
  changeChessBoardPlayerClockTime,
} = componentDataSlice.actions;
export const componentDataSliceReducer = componentDataSlice.reducer;
