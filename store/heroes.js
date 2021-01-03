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
    LOAD_HERO: `${PREFIX} load hero`,
  },
  MUTATIONS: {
    LOAD_HEROES_SUCCESS: `${PREFIX} load heroes success`,
    LOAD_HEROES_FAILED: `${PREFIX} load heroes failed`,
    RESET_HEROES: `${PREFIX} reset heroes`,
    UPDATE_FILTERS: `${PREFIX} update filters`,
    LOAD_HERO_SUCCESS: `${PREFIX} load hero success`,
    LOAD_HERO_FAILED: `${PREFIX} load hero failed`,
    RESET_HERO: `${PREFIX} reset hero`,
  },
  GETTERS: {
    GET_HEROES: `${PREFIX} get heroes`,
    GET_HERO: `${PREFIX} get hero`,
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
  current: loadableState({}),
})

export const actions = {
  /**
   * Fetch list of heroes and store to vault
   * @param {Function} commit
   * @param {Object} list
   * @param {Number} page
   * @param {Boolean} append - append items to current or not
   * @return {Promise<void>}
   */
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
  /**
   * Fetch list of heroes for next page if available
   * @param {Function} dispatch
   * @param {Object} list
   * @return {Promise<void>}
   */
  async [CONSTANTS.ACTIONS.LOAD_NEXT_PAGE]({ dispatch, state: { list } }) {
    const nextPageNumber = paginationNextPage(list)
    if (nextPageNumber) {
      await dispatch(CONSTANTS.ACTIONS.LOAD_HEROES, {
        page: nextPageNumber,
        append: true,
      })
    }
  },
  /**
   * Fetch information about hero by id
   * @param {Function} commit
   * @param {Object} current
   * @param {Number} id - hero id
   * @return {Promise<void>}
   */
  async [CONSTANTS.ACTIONS.LOAD_HERO]({ commit, state: { current } }, id) {
    await loadStart(current, async () => {
      try {
        commit(
          CONSTANTS.MUTATIONS.LOAD_HERO_SUCCESS,
          await this.$repositories.heroes().getById(id)
        )
      } catch (e) {
        commit(CONSTANTS.MUTATIONS.LOAD_HEROES_FAILED, e)
      }
    })
  },
}

export const mutations = {
  /**
   * Store heroes list into vault
   * @param {Object} state
   * @param {Array} payload - list of heroes
   * @param {Object} pagination - pagination settings
   * @param {Boolean} append - append items to current or not
   */
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
  /**
   * Reset pagination, set failed status of request. Store error
   * @param {Object} state
   * @param {*} error - error instance or error message
   */
  [CONSTANTS.MUTATIONS.LOAD_HEROES_FAILED](state, error) {
    state.list = paginationUpdate(loadFailed(state.list, error))
  },
  /**
   * Reset heroes list
   * @param {Object} state
   */
  [CONSTANTS.MUTATIONS.RESET_HEROES](state) {
    state.list = paginationUpdate(loadableState(state.list))
  },
  /**
   * Update heroes list filters
   * @param {Object} state
   * @param {Object} filters - fresh filters
   */
  [CONSTANTS.MUTATIONS.UPDATE_FILTERS](state, filters) {
    state.list.filters = filters
  },
  /**
   * Store hero instance into vault
   * @param {Object} state
   * @param {Object} hero - hero object
   */
  [CONSTANTS.MUTATIONS.LOAD_HERO_SUCCESS](state, hero) {
    state.current = loadSuccess(state.current, hero)
  },
  /**
   * Reset hero instance and store error
   * @param state
   * @param {*} error - message or instance of error
   */
  [CONSTANTS.MUTATIONS.LOAD_HERO_FAILED](state, error) {
    state.current = loadFailed(state.current, error)
  },
  [CONSTANTS.MUTATIONS.RESET_HERO](state) {
    state.current = loadableState({})
  },
}

export const getters = {
  /**
   * Return list of heroes
   * @param {Object} list
   * @return {*}
   */
  [CONSTANTS.GETTERS.GET_HEROES]: ({ list }) => getLoad(list),
  /**
   * Return hero instance
   * @param current
   * @return {*}
   */
  [CONSTANTS.GETTERS.GET_HERO]: ({ current }) => getLoad(current),
}
