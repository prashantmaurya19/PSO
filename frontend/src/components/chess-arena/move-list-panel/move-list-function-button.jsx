//@ts-nocheck
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
  faAnglesLeft,
  faPlus,
  faXmark,
  faElevator,
  faStopwatch,
  faBoltLightning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconWraper } from "@pso/components/icon";
import { setDataChessBoardPosition } from "@pso/store/feature/chess-data";
import {
  decMoveListActiveIndex,
  incMoveListActiveIndex,
  updateMoveListActiveIndex,
} from "@pso/store/feature/component-data";
import { acache } from "@pso/util/cache";
import { travers } from "@pso/util/chess";
import { pmlog } from "@pso/util/log";
import { joinTWClass } from "@pso/util/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
/**
 * @param {{icon:import("react").FC<import("@pso/util/jjsx").JSXProps>,text:string}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveListButton({ icon = null, text = "", className, ...a }) {
  return (
    <button
      {...a}
      className={twMerge(
        joinTWClass(
          "grow-1 h-full",
          "flex justify-center items-center gap-2",
          "text-white text-md",
          "transition-[background]",
          "bg-gray-600/30",
          "hover:bg-gray-600/70",
          "active:scale-[0.96]",
        ),
        className,
      )}
    >
      {icon}
      {text}
    </button>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function GameStateViceMoveListFunctionButtons({ ...a }) {
  const state = useSelector((s) => s.chess.game_state);
  const b_info = acache("LAST_GAME_DURATION").localstorage().get().json();
  return (
    <MoveListFunctionButtons {...a}>
      {state == "playing" ? (
        <>
          <MoveListButton text="1/2 Draw" />
          <MoveListButton
            icon={
              <IconWraper className="h-[70%] aspect-square">
                <FontAwesomeIcon
                  icon={faFlag}
                  rotation={315}
                  style={{ color: "#ffffff" }}
                />
              </IconWraper>
            }
            text="Resign"
          />
        </>
      ) : null}
      {state == "start" ? (
        <>
          <MoveListButton
            icon={
              <IconWraper className="h-[50%] aspect-square">
                <FontAwesomeIcon icon={faXmark} />{" "}
              </IconWraper>
            }
            text="Abort"
          />
        </>
      ) : null}
      {state == "end" ? (
        <>
          <MoveListButton
            className="text-2xl"
            icon={
              <IconWraper className="h-[50%] aspect-square">
                <FontAwesomeIcon
                  icon={b_info.type == "rapid" ? faBoltLightning : faStopwatch}
                />
              </IconWraper>
            }
            text={b_info.label}
          />
        </>
      ) : null}
    </MoveListFunctionButtons>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function MoveListTableFunctionButtons({ ...a }) {
  const c = joinTWClass("h-[50%] aspect-square");
  const move_list = useSelector(
    (s) => s.component_data.move_list_panel.move_list,
  );
  const active_table_index = useSelector(
    (s) => s.component_data.move_list_panel.active_move_index,
  );
  const current_game_position_info = useSelector(
    (s) => s.component_data.chess_board.self.info,
  );
  const dispatch = useDispatch();
  return (
    <MoveListFunctionButtons {...a}>
      <MoveListButton
        onClick={(e) => {
          dispatch(updateMoveListActiveIndex(1));
          const info = travers(1, move_list);
          dispatch(setDataChessBoardPosition(info));
        }}
        icon={
          <IconWraper className={c}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </IconWraper>
        }
      />
      <MoveListButton
        onClick={(e) => {
          const info = travers(active_table_index - 1, move_list);
          if (info) {
            dispatch(decMoveListActiveIndex());
            dispatch(setDataChessBoardPosition(info));
          }
        }}
        icon={
          <IconWraper className={c}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconWraper>
        }
      />
      <MoveListButton
        onClick={(e) => {
          const info = travers(active_table_index + 1, move_list);
          if (info) {
            dispatch(incMoveListActiveIndex());
            dispatch(setDataChessBoardPosition(info));
          }
        }}
        icon={
          <IconWraper className={c}>
            <FontAwesomeIcon icon={faAngleRight} />
          </IconWraper>
        }
      />
      <MoveListButton
        onClick={(e) => {
          dispatch(updateMoveListActiveIndex(move_list.length));
          dispatch(setDataChessBoardPosition(current_game_position_info));
        }}
        icon={
          <IconWraper className={c}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </IconWraper>
        }
      />
    </MoveListFunctionButtons>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function MoveListFunctionButtons({ children, className, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full h-[10%]",
          "flex justify-around items-center",
          "debug",
        ),
        className,
      )}
    >
      {children}
    </div>
  );
}
