import { deleteCookie } from "@pso/util/acookie";

export const ApplicationListener = {
  /** handler onLogout stuff */
  onLogout() {
    deleteCookie("token_id");
  },
};
