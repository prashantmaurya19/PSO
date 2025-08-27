import { twMerge } from "tailwind-merge";
import { ContextContainer } from "../../../components/page/context-container";
import { joinTWClass } from "../../../util/tailwind";
import { BotPlayForm } from "../../../components/form/bot-play";

/**
 * @param {import("../../../util/jjsx").JSXElement} param0
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
