import { setupWorker } from "msw/browser";
import handlers from "./handlers";
import env from "../util/env";
const browser = setupWorker(...handlers);
export default browser;
export async function enableMocking() {
  if (env.profile.active !== "devlopment") {
    return;
  }
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return browser.start();
}

