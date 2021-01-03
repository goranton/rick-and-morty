import {
  getLoad,
  loadableState,
  loadFailed,
  loadStart,
  loadSuccess,
  loadSuccessAppend,
} from '../helpers/loadable.store'
import {
  paginationNextPage,
  paginationState,
  paginationUpdate,
} from '../helpers/pagination.store'

export const PREFIX = '[HERO]'
export const CONSTANTS = {
  ACTIONS: {
    LOAD_HEROES: `${PREFIX} load heroes`,
    LOAD_NEXT_PAGE: `${PREFIX} load next page`,
  },
  MUTATIONS: {
    LOAD_HEROES_SUCCESS: `${PREFIX} load heroes success`,
    LOAD_HEROES_FAILED: `${PREFIX} load heroes failed`,
    RESET_HEROES: `${PREFIX} reset heroes`,
    UPDATE_FILTERS: `${PREFIX} update filters`,
  },
  GETTERS: {
    GET_HEROES: `${PREFIX} get heroes`,
  },
}

export const state = () => ({
  list: paginationState(
    loadableState({
      filters: {
        name: '',
      },
    })
  ),
})

export const actions = {
  async [CONSTANTS.ACTIONS.LOAD_HEROES](
    { commit, state: { list } },
    { page = 1, append = false } = {}
  ) {
    await loadStart(list, async () => {
      try {
        commit(CONSTANTS.MUTATIONS.LOAD_HEROES_SUCCESS, {
          ...(await this.$repositories.heroes().list(page, list.filters)),
          append,
        })
      } catch (e) {
        commit(CONSTANTS.MUTATIONS.LOAD_HEROES_FAILED, e)
      }
    })
  },
  async [CONSTANTS.ACTIONS.LOAD_NEXT_PAGE]({ dispatch, state: { list } }) {
    const nextPageNumber = paginationNextPage(list)
    if (nextPageNumber) {
      await dispatch(CONSTANTS.ACTIONS.LOAD_HEROES, {
        page: nextPageNumber,
        append: true,
      })
    }
  },
}

export const mutations = {
  [CONSTANTS.MUTATIONS.LOAD_HEROES_SUCCESS](
    state,
    { payload, pagination = {}, append = false }
  ) {
    const properties = [state.list, payload]
    state.list = paginationUpdate(
      append
        ? loadSuccessAppend.apply(null, properties)
        : loadSuccess.apply(null, properties),
      pagination
    )
  },
  [CONSTANTS.MUTATIONS.LOAD_HEROES_FAILED](state, error) {
    state.list = paginationUpdate(loadFailed(state.list, error))
  },
  [CONSTANTS.MUTATIONS.RESET_HEROES](state) {
    state.list = paginationUpdate(loadableState(state.list))
  },
  [CONSTANTS.MUTATIONS.UPDATE_FILTERS](state, filters) {
    state.list.filters = filters
  },
}

export const getters = {
  [CONSTANTS.GETTERS.GET_HEROES]: ({ list }) => getLoad(list),
}
