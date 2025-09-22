import { twMerge } from "tailwind-merge";
import { ContextContainer } from "@pso/components/page/context-container";
import { joinTWClass } from "@pso/util/tailwind";
import { BotPlayForm } from "@pso/components/form/bot-play";

/**
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function BotPlayCreateMenu({ className = "", ...opt }) {
  return (
    <ContextContainer
      {...opt}
      className={twMerge(
        className,
        joinTWClass("flex justify-center items-center"),
      )}
    >
      <BotPlayForm />
    </ContextContainer>
  );
}
