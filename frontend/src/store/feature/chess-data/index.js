import { createSlice } from "@reduxjs/toolkit";
import { ChessData } from "./game-data";
import { picture } from "./demo-pictures";
import { min2ms } from "@pso/util/time";
import { copy } from "@pso/util/aobject";
import { emit, Events } from "@pso/util/event";
/**
 * @typedef {Object} InitState
 * @property {PlayersData} players_data
 * @property {PlayerType} turn
 * @property {import("../../../util/chess").BoardInfo} chess_position
 * @property {FlipTypes} flip
 * @property {import("@pso/util/time").DurationCache} [ duration ]
 */

/**
 * @type {PlayersData}
 */
const players_data = {
  p: {
    name: "xyz",
    address: "1234:xyz",
    side: "w",
    rating: 100,
    clockTime: min2ms(1),
    picture,
  },
  o: {
    name: "abc",
    address: "5678:abc",
    side: "b",
    rating: 100,
    clockTime: min2ms(1),
    picture,
  },
};

/**
 * @type {InitState}
 */
const initialState = {
  players_data,
  flip: "normal",
  chess_position: {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    // fen: "r4bnr/ppR2ppp/3ppk2/2p5/8/8/PPPPPPPP/1NBQKBNR w KQkq - 0 1",
    // fen: "rnbqkbnr/pppppppp/8/8/8/3BPN2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
    // fen: "rnb1kbnr/pppppppp/8/1q6/8/4PN2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
    // fen:"rnbqk2r/pppp1pbp/5np1/4p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b KQ - 0 0",
    kings: { b: [4, 0], w: [4, 7] },
    // kings: { b: [5, 2], w: [4, 7] },
  },
  turn: "p",
  duration: undefined,
};

export const chessBoardSlice = createSlice({
  name: "chess-data",
  initialState,
  reducers: {
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
    setDataChessBoardDuration(state, action) {
      state.duration = action.payload;
    },
    setDataChessBoardTurn: (state, action) => {
      for (const i in state.players_data) {
        //@ts-ignore
        if (state.players_data[i].side == action.payload) {
          //@ts-ignore
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
  setDataChessBoardDuration,
} = chessBoardSlice.actions;
export const chessBoardSliceReducer = chessBoardSlice.reducer;

/**
 * @typedef {"p"|"o"} PlayerType
 * @typedef {{name:string,side:import("../../../util/chess").ChessColor,picture:string,rating:number,address:string,clockTime:number}} PlayerData
 * @typedef {Record<PlayerType,PlayerData>} PlayersData
 * @typedef {"normal"|"board"|"perspective"} FlipTypes
 */
export default {};
