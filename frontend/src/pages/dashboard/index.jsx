import { useEffect, useRef } from "react";
import { BubbleButton } from "../../components/buttons/navbutton/bubble-button";
import NavBar from "../../components/header/navbar";
import { ToolTipMenu } from "../../components/menu/tooltip-menu";
import { PageContentLayout, PageLayout } from "../../components/page/section";
import { joinTWClass } from "../../util/tailwind";
import { toggleJsxAtrribute } from "../../util/jjsx";
import { ToolTipButton } from "../../components/buttons/tooltip-menu-buttons";
import { Avatar, AvatarCircle } from "../../components/profile/avatar";
import { NavElementSet } from "../../components/header/nav-elementset";
import { ToolTipSolidSeparator } from "../../components/separator/tooltip-menu";
import { ChessPlayGround } from "./dmain";
import { DToolTipMenusHolder } from "./dtooltip-menu";
import { useSelector } from "react-redux";
import { SettingGearIcon } from "../../components/icon/dashboard";
import { Navigate, useLocation } from "react-router-dom";

export function DashBoard() {
  const location = useLocation();
  const auth = location.auth;
  if (auth == null) {
    return <Navigate to={"/login"} />;
  }
  const context_manager = useSelector(
    (state) => state.contextSwitchSclice.contexts,
  );
  const profile_toot_tip_menu = useRef();
  const defaultelement = useRef(null);
  const chessplaygroundelement = useRef(null);
  useEffect(() => {
    context_manager.show("dmain", defaultelement.current, "data-subview");
  });
  // const dispath = useDispatch();
  return (
    <PageLayout className="flex justify-center items-center flex-col">
      <NavBar>
        <NavElementSet
          className={joinTWClass("h-full aspect-square", "relative")}
        >
          <BubbleButton
            onClick={(e) => {
              e.preventDefault();
              context_manager.show(
                "dmain",
                chessplaygroundelement.current,
                "data-subview",
              );
            }}
            className={joinTWClass(
              "border-2 border-solid border-orange-500/70",
              "hover:border-red-700",
              "p-0.5",
            )}
          >
            <SettingGearIcon />
          </BubbleButton>
        </NavElementSet>
        <NavElementSet
          className={joinTWClass("h-full aspect-square", "relative")}
        >
          <BubbleButton
            onClick={(e) => {
              e.preventDefault();
              toggleJsxAtrribute(profile_toot_tip_menu.current, "data-clicked");
            }}
            className={joinTWClass(
              "border-2 border-solid border-gray-600/70",
              "hover:border-gray-300",
              "focus:border-gray-300",
            )}
          >
            <Avatar />
          </BubbleButton>
        </NavElementSet>
      </NavBar>
      <PageContentLayout className="relative">
        <DToolTipMenusHolder>
          <ToolTipMenu
            ref={profile_toot_tip_menu}
            className={joinTWClass(
              "transition-opacity duration-200 h-[20vh]",
              "w-[20vw]",
              "top-full right-0 absolute",
              "mt-[2px] mr-[5px]",
              "z-10 opacity-0",
              "data-clicked:opacity-100",
              "bg-bg-light",
              "border-1 border-solid border-gray-600 z-1000",
            )}
          >
            <ToolTipButton
              className="bg-gray-900 rounded-2xl "
              icon={<AvatarCircle className="h-full" />}
              text="Add Account"
            />
            <ToolTipSolidSeparator
              lineProp={{ className: joinTWClass("bg-gray-800") }}
            />
            <ToolTipButton
              className="bg-gray-900/95 rounded-2xl"
              icon={<AvatarCircle className="h-full" />}
              text="Add Account"
            />
          </ToolTipMenu>
        </DToolTipMenusHolder>
        <ChessPlayGround
          ref={chessplaygroundelement}
          className="bg-purple-600"
        />
        <ChessPlayGround ref={defaultelement} className="bg-sky-500" />
      </PageContentLayout>
    </PageLayout>
  );
}
