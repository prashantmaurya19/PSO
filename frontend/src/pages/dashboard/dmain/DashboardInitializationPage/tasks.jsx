import { request } from "@pso/util/requests";

/**
 * @type {Array<{name:string,config:function():Promise<void>}>}
 */
export const INITIALIZATION_TASK_LIST = [
  {
    name: "Security Check Up",
    config() {
      return new Promise(async (resolve, reject) => {
        // await request("/ur/").get().execute();
        setTimeout(resolve.bind(this, true), 2000);
      });
    },
  },
];
