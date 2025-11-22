const DOMAIN_KEY = window.location.host.replace(/[^a-zA-Z0-9]/g, '_');
const STORAGE_KEY = `ozz_app_state_${DOMAIN_KEY}`;

// Default state
let ozz_app_state = {
  nav_collapsed: false,
  block_editor_expanded: false,
  block_editor_collapsed: false,
  popup_opened: false,
  block_editor_stock_layout: 'lay2',
  theme: 'light',
};

/**
 * Get State
 */
function GetState(key = false) {
  const hasItem =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(STORAGE_KEY) !== null;

  const state = hasItem
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : ozz_app_state;

  return key ? state[key] : state;
}

/**
 * Set State
 */
function SetState(key, value) {
  const hasItem =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(STORAGE_KEY) !== null;

  const state = hasItem
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : ozz_app_state;

  state[key] = value;
  ozz_app_state = state;

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export { SetState, GetState };