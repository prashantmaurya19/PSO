import { createSlice } from "@reduxjs/toolkit";
import { ChessData } from "./game-data";
import { picture } from "./demo-pictures";
import { min2ms } from "../../../util/time";
import { copy } from "../../../util/aobject";
import { emit, Events } from "../../../util/event";
/**
 * @typedef {Object} InitState
 * @property {PlayersData} players_data
 * @property {PlayerType} turn
 * @property {number} clock_refresh
 * @property {number} player_refresh
 * @property {string} chess_position
 * @property {FlipTypes} flip
 */

/**
 * @type {PlayersData}
 */
const players_data = {
  p: {
    name: "xyz",
    address: "1234:xyz",
    side: "b",
    rating: 100,
    clockTime: min2ms(1),
    picture,
  },
  o: {
    name: "abc",
    address: "5678:abc",
    side: "w",
    rating: 100,
    clockTime: min2ms(1),
    picture,
  },
};

/**
 * @type {InitState}
 */
const initialState = {
  data: new ChessData(),
  players_data,
  flip: "normal",
  chess_position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  turn: "p",
};

export const chessBoardSlice = createSlice({
  name: "chess-data",
  initialState,
  reducers: {
    updatePlayerData: (state, action) => {
      copy(action.payload, state.players_data);
      if (action.payload["p"] != undefined)
        emit(Events.PLAYER_DATA_UPDATED, { p: state.action.payload["p"] });
      if (action.payload["o"] != undefined)
        emit(Events.PLAYER_OPONENT_DATA_UPDATED, {
          o: state.action.payload["o"],
        });
    },
    toggle: (state, _) => {},
  },
});

export const { updatePlayerData, toggle } = chessBoardSlice.actions;
export const chessBoardSliceReducer = chessBoardSlice.reducer;

/**
 * @typedef {"b"|"w"} PlayerSide
 * @typedef {"p"|"o"} PlayerType
 * @typedef {{name:string,side:PlayerSide,picture:string,rating:number,address:string,clockTime:number}} PlayerData
 * @typedef {{"p":PlayerData,"o":PlayerData}} PlayersData
 * @typedef {"normal"|"board"|"perspective"} FlipTypes
 */
export default {};
