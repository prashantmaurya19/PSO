import { toggleJsxAtrribute } from "../../../util/jjsx";

export class ContextManager {
  constructor() {
    this.views = {};
  }

  /**
   * @param {string} context_name
   */
  get(context_name) {
    return this.views[context_name];
  }

  /**
   * @param {string} context_name - name of context
   * @param {HTMLElement} e
   */
  set(context_name, e) {
    this.views[context_name] = e;
  }

  /**
   * @param {string} context_name - name of context
   * @param {HTMLElement} e
   * @param {string} att_name - atrribute name
   */
  show(context_name, e, att_name) {
    if (this.get(context_name)){
      toggleJsxAtrribute(this.get(context_name), att_name);
    }
    toggleJsxAtrribute(e, att_name);
    this.set(context_name, e);
  }
}
