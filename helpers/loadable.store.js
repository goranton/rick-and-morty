export const STATUS_PENDING = Symbol('pending')
export const STATUS_SUCCESS = Symbol('success')
export const STATUS_ERROR = Symbol('error')

export function loadableState(state) {
  return {
    ...state,
    data: null,
    status: null,
    error: null,
  }
}

export function loadStart(state, callback) {
  if (state.status !== STATUS_PENDING && typeof callback === 'function') {
    return callback()
  }
}

export function loadSuccess(state, payload) {
  return {
    ...state,
    data: payload,
    status: STATUS_SUCCESS,
    error: null,
  }
}

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
