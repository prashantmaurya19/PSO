import NavBar from "@pso/components/header/navbar";
import { PageContentLayout, PageLayout } from "@pso/components/page/section";
import { hasCookie } from "@pso/util/acookie";
import { Navigate, Outlet } from "react-router-dom";

export function DashBoard() {
  if (!hasCookie("token_id")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <PageLayout className="flex justify-center items-center flex-col">
      <NavBar></NavBar>
      <PageContentLayout>
        <Outlet />
      </PageContentLayout>
    </PageLayout>
  );
}
