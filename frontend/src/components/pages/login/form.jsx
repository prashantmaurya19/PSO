import { twMerge } from "tailwind-merge";
import { join } from "../../../util/tailwind";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function ForgetPasswordLink({ className = "" }) {
  const navigate = useNavigate();
  return (
    <a
      className={twMerge(join("w-max h-full"), className)}
      onClick={(_e) => navigate("/")}
    >
      Forget Password?
    </a>
  );
}

export function RememberMe({ className = "" }) {
  return (
    <span className={twMerge(join("h-full w-max"), className)}>
      <input type="checkbox" /> Remember me
    </span>
  );
}

export function InputField({
  className = "",
  inputType = "text",
  inputClass = "",
  inputPlaceholder = "Enter Email",
  icon,
}) {
  return (
    <div
      className={twMerge(
        join(
          "border-index-third border-2 border-solid",
          "flex justify-center items-center",
          "mb-3",
          "rounded-4xl",
          "overflow-hidden",
          "bg-index-third",
        ),
        className,
      )}
    >
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        className={twMerge(
          join("h-full", "bg-bg", "text-index-second", "p-2", "grow-1"),
          inputClass,
        )}
      />
      {icon}
    </div>
  );
}

/**
 * @param {Object} param0
 * @param {string} [param0.className=""]
 */
export default function LoginForm({ className = "" }) {
  useGSAP(async () => {
    const tl = gsap.timeline();
    await tl
      .to("#login-form-container", {
        boxShadow: `0px 0px 10px 1px ${getComputedStyle(document.documentElement).getPropertyValue("--color-index-third")}`,
        duration: 1,
      })
      .from(".fields", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
      });
  });

  const element_width = "w-[23vw]";
  return (
    <div
      id="login-form-container"
      className={twMerge(
        join(
          // "outline-1 rounded-[4px] outline-index-third ",
          "flex justify-start items-center flex-col",
          " w-max h-max",
          "px-10 py-10",
          "rounded-2xl",
          // "shadow-[0px_0px_10px_1px_theme(colors.index-third)]",
        ),
        className,
      )}
    >
      <span
        className={join(
          `${element_width} h-[5vh]`,
          "fields",
          "bg-transparent text-index-third",
          "border-2 border-solid border-index-third",
          "flex items-center justify-center",
          "text-lg",
          "rounded-[10px]",
          "mb-10",
        )}
      >
        Welcome to Chess.com
      </span>
      <InputField
        className={`${element_width} h-[5vh] fields`}
        inputClass="p-3"
        icon={
          <svg
            className="h-full aspect-square  mr-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path
              className="fill-index-second"
              d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
            />
          </svg>
        }
      />
      <InputField
        className={`${element_width} h-[5vh] fields`}
        inputType="password"
        inputPlaceholder="Enter Password"
        inputClass="p-3"
        icon={
          <button
            className={join(
              "text-index-third text-lg",
              "aspect-square h-full",
              "mr-1",
              "flex justify-center items-center",
            )}
          >
            <svg
              className="aspect-square h-[80%]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                className="fill-amber-50"
                d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"
              />
            </svg>
          </button>
        }
      />

      <div
        className={join(
          "fields",
          `${element_width} h-[5vh]`,
          "text-index-second-500",
          "flex justify-between",
          "text-xl",
        )}
      >
        <RememberMe />
        <ForgetPasswordLink />
      </div>

      <button
        className={join(
          "fields",
          "text-index-third text-lg",
          "border-2 border-solid border-index-third",
          "rounded-4xl",
          `${element_width} h-[5vh]`,
        )}
      >
        Log In
      </button>
    </div>
  );
}
