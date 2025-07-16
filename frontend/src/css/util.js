import React from "react";

const M = {
  /**
   * @param {React.CSSProperties[]} css
   *
   * @returns {React.CSSProperties}
   */
  join: function (...css) {
    return Object.assign({}, ...css);
  },
};

export default M;
