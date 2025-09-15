import NavBar from "@pso/components/header/navbar";
import { PageContentLayout, PageLayout } from "@pso/components/page/section";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function DashBoard() {
  const location = useLocation();
  const auth = location.state == undefined ? null : location.state.auth;
  // if (auth == null) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <PageLayout className="flex justify-center items-center flex-col">
      <NavBar></NavBar>
      <PageContentLayout>
        <Outlet />
      </PageContentLayout>
    </PageLayout>
  );
}
