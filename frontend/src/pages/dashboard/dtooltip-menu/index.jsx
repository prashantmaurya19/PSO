/**
 * @param {import("../../../util/jjsx").JSXElement}
 */
export function DToolTipMenusHolder({ children }) {
  return <div className="relative ">{children}</div>;
}
// <DToolTipMenusHolder>
//   <ToolTipMenu
//     ref={profile_toot_tip_menu}
//     className={joinTWClass(
//       "transition-opacity duration-200 h-[20vh]",
//       "w-[20vw]",
//       "top-full right-0 absolute",
//       "mt-[2px] mr-[5px]",
//       "z-10 opacity-0",
//       "data-clicked:opacity-100",
//       "bg-bg-light",
//       "border-1 border-solid border-gray-600 z-1000",
//     )}
//   >
//     <ToolTipButton
//       className="bg-gray-900 rounded-2xl "
//       icon={<AvatarCircle className="h-full" />}
//       text="Add Account"
//     />
//     <ToolTipSolidSeparator
//       lineProp={{ className: joinTWClass("bg-gray-800") }}
//     />
//     <ToolTipButton
//       className="bg-gray-900/95 rounded-2xl"
//       icon={<AvatarCircle className="h-full" />}
//       text="Add Account"
//     />
//   </ToolTipMenu>
// </DToolTipMenusHolder>
