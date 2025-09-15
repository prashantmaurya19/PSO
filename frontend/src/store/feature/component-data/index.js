import { createSlice } from "@reduxjs/toolkit";
import { combine } from "@pso/util/aobject";

const initialState = {
  // NOTE i want to rename chess_board to chess_arena
  // but due to multiple usage i leaving it as it is
  chess_board: {
    self: {
      display: true,
      position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    },
    promotion_piece_overlay: {
      display: false,
      promotion_index: null,
    },
    loader: {
      display: false,
    },
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
} = componentDataSlice.actions;
export const componentDataSliceReducer = componentDataSlice.reducer;
