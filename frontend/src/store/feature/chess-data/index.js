import { createSlice } from "@reduxjs/toolkit";
import { picture } from "./demo-pictures";
import { copy } from "@pso/util/aobject";
import { emit } from "@pso/util/event";
import { Creator } from "@pso/util/chess";
/**
 * @typedef {Object} InitState
 * @property {import("@pso/util/chess").GameStateName} game_state
 * @property {PlayersData} players_data
 * @property {PlayerType} turn
 * @property {import("@pso/util/chess").BoardInfo} chess_position
 * @property {boolean} flip
 * @property {import("@pso/util/chess").ChessMoveNotation} [promotion_notation]
 */

/**
 * @type {InitState}
 */
const initialState = {
  game_state: "init",
  players_data: {
    p: {
      name: "xyz",
      address: "1234:xyz",
      side: "w",
      rating: 100,
      picture,
    },
    o: {
      name: "abc",
      address: "5678:abc",
      side: "b",
      rating: 100,
      picture,
    },
  },
  flip: true,
  chess_position: Creator.getNewChessPosition(),
  turn: "p",
  promotion_notation: "",
};

export const chessBoardSlice = createSlice({
  name: "chess-data",
  initialState,
  reducers: {
    initializeChessBoardData(state, _) {
      state.chess_position = Creator.getNewChessPosition();
      state.promotion_notation = "";
      state.game_state = "init";
    },
    setDataChessBoardFlip(state, action) {
      state.flip = action.payload;
    },
    setDataChessBoardGameState(state, action) {
      state.game_state = action.payload;
    },
    setDataChessBoardLastNotation(state, action) {
      state.promotion_notation = action.payload;
    },
    setDataChessBoardPlayer: (state, action) => {
      copy(action.payload, state.players_data);
      if (action.payload["p"] != undefined)
        emit("PLAYER_DATA_UPDATED", { p: action.payload["p"] });
      if (action.payload["o"] != undefined)
        emit("PLAYER_OPONENT_DATA_UPDATED", {
          o: action.payload["o"],
        });
    },
    setDataChessBoardPosition: (state, action) => {
      state.chess_position = action.payload;
    },
    setDataChessBoardTurn: (state, action) => {
      for (const i in state.players_data) {
        if (state.players_data[i].side == action.payload) {
          // @ts-ignore
          state.turn = i;
        }
      }
    },
    toggleTurn: (state, _) => {
      state.turn = state.turn == "o" ? "p" : "o";
    },
  },
});

export const {
  setDataChessBoardTurn,
  setDataChessBoardPlayer,
  toggleTurn,
  setDataChessBoardPosition,
  setDataChessBoardLastNotation,
  setDataChessBoardGameState,
  initializeChessBoardData,
} = chessBoardSlice.actions;
export const chessBoardSliceReducer = chessBoardSlice.reducer;

/**
 * @typedef {"p"|"o"} PlayerType
 * @typedef {{name:string,side:import("@pso/util/chess").ChessColor,picture:string,rating:number,address:string}} PlayerData
 * @typedef {Record<PlayerType,PlayerData>} PlayersData
 */
export default {};
