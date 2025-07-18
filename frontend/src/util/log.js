

/**  
 * @template T
 * @param {T} t - value to debug
 * @returns {T}
*/
export function debug(t){
  console.log(`%c${t}`,"color:red;")
  return t
}


