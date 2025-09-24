export const INITIALIZER_STATE = {
  ready: false,
};

export function initializeInitializerState() {
  initializerOff();
}

export function initializerOn() {
  INITIALIZER_STATE.ready = true;
}

export function initializerOff() {
  INITIALIZER_STATE.ready = false;
}

export function getInitializerState() {
  return INITIALIZER_STATE.ready;
}
