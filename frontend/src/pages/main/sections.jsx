//@ts-nocheck
import { faChess } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconDiv } from "@pso/components/icon/fontawesome";
import { joinTWClass } from "@pso/util/tailwind";
import { twMerge } from "tailwind-merge";

/**
 * @param {{className:string,opt:object}}
 */
export function SloganText({ opt = {}, className = "", children }) {
  return (
    <span
      {...opt}
      className={twMerge(
        "block text-[5rem] italic w-[90%] text-center",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function RightSlogan() {
  return (
    <div className="flex flex-col w-[40%] h-full bg-transparent text-index-second items-center justify-start font-DM_Sans font-black">
      <SloganText className="text-[10rem] text-start main-right">
        Play
      </SloganText>
      <SloganText className="text-[15rem] main-right">Enjoy</SloganText>
      <SloganText className="text-[7rem] text-end main-right">
        Compete
      </SloganText>
    </div>
  );
}

/**
 * @param {import("../../util/jjsx").JSXProps} param0
 */
export function LeftSection({ ...a }) {
  return (
    <div
      {...a}
      className="box-border h-full w-[60%] flex items-center justify-center"
    >
      <span
        id="main-left-chess_board"
        className={joinTWClass(
          "w-1/2 aspect-square rounded-[7px]",
          "flex justify-center items-center",
        )}
      >
        <FontAwesomeIconDiv
          className="w-full h-full"
          iconProps={{
            icon: faChess,
            style: { color: "greenyellow" },
            size: "xs",
          }}
        />
      </span>
    </div>
  );
}
