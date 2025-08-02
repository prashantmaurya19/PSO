import { twMerge } from "tailwind-merge";

/**
 * @param {Object} param0
 * @param {string} [param0.className=""]
 */
export default function LoginForm({ className = "" }) {
  return <div className={twMerge("outline-1 rounded-[4px] outline-index-third backdrop-blur-[3px]"," w-1/2 h-9/12", className)}></div>;
}
