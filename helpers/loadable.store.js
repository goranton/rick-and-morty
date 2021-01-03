export const STATUS_PENDING = Symbol('pending')
export const STATUS_SUCCESS = Symbol('success')
export const STATUS_ERROR = Symbol('error')

/**
 * Return base loadable structure
 * @param {Object} state
 * @return {{data: null, error: null, status: null}}
 */
export function loadableState(state) {
  return {
    ...state,
    data: null,
    status: null,
    error: null,
  }
}

/**
 * Prevent race condition. Call callback only if last request completed
 * @param {Object} state
 * @param {Function} callback
 * @return {*}
 */
export function loadStart(state, callback) {
  if (state.status !== STATUS_PENDING && typeof callback === 'function') {
    return callback()
  }
}

/**
 * Return base success full loadable structure
 * @param {Object} state
 * @param {*} payload
 * @return {{data: *, error: null, status: symbol}}
 */
export function loadSuccess(state, payload) {
  return {
    ...state,
    data: payload,
    status: STATUS_SUCCESS,
    error: null,
  }
}

/**
 * @param state
 * @param payload
 * @return {{data: *, error: null, status: symbol}|*}
 */
export function loadSuccessAppend(state, payload) {
  if (Array.isArray(payload)) {
    return loadSuccess(state, [...state.data, ...payload])
  }

  return state
}

export function loadFailed(state, error = null) {
  return {
    ...state,
    data: null,
    status: STATUS_ERROR,
    error,
  }
}

export function getLoad(state) {
  return state.data
}
