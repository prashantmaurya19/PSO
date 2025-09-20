//@ts-nocheck
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
  faAnglesLeft,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconWraper } from "@pso/components/icon";
import { pmlog } from "@pso/util/log";
import { joinTWClass } from "@pso/util/tailwind";
import { useSelector } from "react-redux";
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
          "text-white",
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
            icon={
              <IconWraper className="h-[50%] aspect-square">
                <FontAwesomeIcon icon={faPlus} />
              </IconWraper>
            }
            text="New Game"
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
  return (
    <MoveListFunctionButtons {...a}>
      <MoveListButton
        onClick={(e) => {}}
        icon={
          <IconWraper className={c}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </IconWraper>
        }
      />
      <MoveListButton
        onClick={(e) => {}}
        icon={
          <IconWraper className={c}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconWraper>
        }
      />
      <MoveListButton
        onClick={(e) => {}}
        icon={
          <IconWraper className={c}>
            <FontAwesomeIcon icon={faAngleRight} />
          </IconWraper>
        }
      />
      <MoveListButton
        onClick={(e) => {}}
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
