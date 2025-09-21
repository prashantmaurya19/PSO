import { createSlice } from "@reduxjs/toolkit";
import { combine } from "@pso/util/aobject";
import { Creator } from "@pso/util/chess";

const initialState = {
  // NOTE i want to rename chess_board to chess_arena
  // but due to multiple usage i leaving it as it is
  chess_board: {
    self: {
      display: true,
      info: Creator.getNewChessPosition(),
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
    /** @type {Array<import("@pso/util/chess").ChessMoveNotation>} */
    move_list: [],
    active_move_index: 0,
    request: { title: "" },
    flip: true,
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
    updateMoveListFlip(state, action) {
      state.move_list_panel.flip = action.payload;
    },
    updateMoveListActiveIndex(state, action) {
      if (
        action.payload <= state.move_list_panel.move_list.length &&
        action.payload > -1
      )
        state.move_list_panel.active_move_index = action.payload;
    },
    incMoveListActiveIndex(state, _) {
      if (
        state.move_list_panel.active_move_index + 1 <=
        state.move_list_panel.move_list.length
      )
        state.move_list_panel.active_move_index++;
    },
    decMoveListActiveIndex(state, _) {
      if (state.move_list_panel.active_move_index - 1 > -1)
        state.move_list_panel.active_move_index--;
    },
    pushChessNotationToMoveList(state, action) {
      state.move_list_panel.move_list.push(action.payload);
      state.move_list_panel.active_move_index++;
    },
    updateMoveListArray(state, action) {
      state.move_list_panel.move_list = action.payload;
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
  pushChessNotationToMoveList,
  incMoveListActiveIndex,
  decMoveListActiveIndex,
  updateMoveListActiveIndex,
  updateMoveListArray,
  updateMoveListFlip,
  updateChessBoard,
  updatePromotionPieceOverlay,
  updateChessBoardFindOponentLoader,
  updateGameWinnerBannerOverlay,
  updateDebugFenOverlay,
  updateChessBoardDuration,
  changeChessBoardPlayerClockTime,
} = componentDataSlice.actions;
export const componentDataSliceReducer = componentDataSlice.reducer;
