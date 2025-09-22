import { ContextContainer } from "@pso/components/page/context-container";
import { joinTWClass } from "@pso/util/tailwind";
import { InitializerContainer } from "./initializer";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function DashboardInitializationPage({ ...opt }) {
  return (
    <ContextContainer
      {...opt}
      className={joinTWClass("flex justify-center items-center")}
    >
      <InitializerContainer />
    </ContextContainer>
  );
}
