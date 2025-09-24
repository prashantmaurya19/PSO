import { ContextContainer } from "@pso/components/page/context-container";
import { joinTWClass } from "@pso/util/tailwind";
import { InitializerContainer } from "./initializer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeInitData } from "@pso/store/feature/initialization-data";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function DashboardInitializationPage({ ...opt }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeInitData());
  });
  return (
    <ContextContainer
      {...opt}
      className={joinTWClass("flex justify-center items-center")}
    >
      <InitializerContainer />
    </ContextContainer>
  );
}
