export function paginationState(state) {
  return {
    ...state,
    page: 1,
    count: 0,
    next: null,
    prev: null,
  }
}

export function paginationUpdate(
  state,
  { page = 1, count = 0, next = null, prev = null } = {}
) {
  return {
    ...state,
    page,
    count,
    next,
    prev,
  }
}

export function paginationHasNext(state) {
  return state.next !== null
}

export function paginationNextPage({ page, ...state }) {
  if (paginationHasNext(state)) {
    return page + 1
  }

  return false
}
