import { twMerge } from "tailwind-merge";
import { useRef } from "react";
import c from "../../../util/config";

/**
 * @param {{className:string,opt:object}}
 */
function SloganText({ opt = {}, className = "", children }) {
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

function RightSlogan() {
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

function LeftSection() {
  return (
    <div className="box-border h-full w-[60%] flex items-center justify-center">
      <span
        id="main-left-chess_board"
        className="bg-linear-90 from-pink-600 to-red-600  w-1/2 aspect-square rounded-[7px]"
      ></span>
    </div>
  );
}

export default function Section1() {
  return (
    <section className="flex items-center justify-between w-full h-[96vh] overflow-hidden">
      <LeftSection />
      <RightSlogan />
    </section>
  );
}
