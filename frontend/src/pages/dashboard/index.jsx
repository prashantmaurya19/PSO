import NavBar from "../../components/header/navbar";
import { PageContentLayout, PageLayout } from "../../components/page/section";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { StartUpMenu } from "./dmain";
import { GameDurationMenu } from "./dmain/GameDurationMenu";

export function DashBoard() {
  const location = useLocation();
  const auth = location.auth;
  // if (auth == null) {
  //   return <Navigate to={"/login"} />;
  // }
  const context_manager = useSelector(
    (state) => state.context_manager.contexts,
  );
  return (
    <PageLayout className="flex justify-center items-center flex-col">
      <NavBar></NavBar>
      <PageContentLayout className="relative">
        <GameDurationMenu />
	<StartUpMenu />
      </PageContentLayout>
    </PageLayout>
  );
}
