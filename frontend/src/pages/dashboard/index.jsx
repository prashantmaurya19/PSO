import { SignUpButton } from "@pso/components/buttons/navbutton";
import NavBar from "@pso/components/header/navbar";
import { PageContentLayout, PageLayout } from "@pso/components/page/section";
import { ApplicationListener } from "@pso/listeners/app-listeners";
import { hasCookie } from "@pso/util/acookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export function DashBoard() {
  if (!hasCookie("token_id")) {
    return <Navigate to={"/login"} />;
  }
  const navigate = useNavigate();
  return (
    <PageLayout className="flex justify-center items-center flex-col">
      <NavBar>
        <SignUpButton
          onClick={function () {
            ApplicationListener.onLogout();
            navigate("/login");
          }}
          text="logout"
        />
      </NavBar>
      <PageContentLayout>
        <Outlet />
      </PageContentLayout>
    </PageLayout>
  );
}
