import { twMerge } from "tailwind-merge";
import { join } from "../../../util/tailwind";

/**
 * @param {{className:string}}
 */
function SloganText({ className = "", children }) {
  return (
    <span
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
    <div className="flex flex-col aspect-square h-[80%] bg-transparent text-index-second items-center justify-start font-DM_Sans font-black">
      <SloganText className="text-[10rem] text-start">Play</SloganText>
      <SloganText className="text-[15rem]">Enjoy</SloganText>
      <SloganText className="text-[7rem] text-end">Compete</SloganText>
    </div>
  );
}

function LeftSection() {
  return (
    <div className="box-border h-full w-[35%] flex items-end justify-start">
      <span
        className={join(
          "w-[150px] h-30px",
          "font-Roboto",
          "rounded-2xl border-solid border-1 border-index-third",
          "flex justify-center items-center",
          "text-index-third",
          "ml-2 mb-1.5",
        )}
      >
        more here
        <span
          className={join(
            "overflow-hidden ",
            "flex justify-center items-center",
            "h-max w-max",
            "animate-[bounce_600ms_infinite]",
            "translate-y-[4px]",
          )}
        >
          <span className="material-symbols-outlined">
            keyboard_double_arrow_down
          </span>
        </span>
      </span>
    </div>
  );
}

export default function Section1() {
  return (
    <section className="flex items-center justify-between w-full h-[96vh]">
      <LeftSection />
      <RightSlogan />
    </section>
  );
}
