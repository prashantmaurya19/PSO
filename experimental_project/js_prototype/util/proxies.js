/**
 * @typedef {Object} ProxyHandlers
 * @property {ProxyHandler.<import("../store/feature/chess-data/app-data").AppData>} app_data_handler
 */
const handlers = {
  app_data_handler: {
    /**
     * @param {import("../store/feature/chess-data/app-data").AppData} target
     */
    get(target, prop, receiver) {
      if (prop == "player" && target.player == undefined) {
        target.player = "human";
      }
      return Reflect.get(...arguments);
    },
  },
};
