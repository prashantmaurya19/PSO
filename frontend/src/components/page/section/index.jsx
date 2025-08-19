import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";

/**
 * @param {import("react").HTMLProps & import("react").HTMLAttributes} p0
 */
export function PageContentLayout({ className, children, ...a }) {
  return (
    <section
      {...a}
      className={twMerge(joinTWClass("w-full", "grow-1"), className)}
    >
      {children}
    </section>
  );
}

/**
 * @param {import("react").HTMLProps & import("react").HTMLAttributes} p0
 */
export function PageLayout({ className, children, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass("h-[100vh] w-[100vw]", "bg-bg", "overflow-hidden"),
        className,
      )}
    >
      {children}
    </div>
  );
}
