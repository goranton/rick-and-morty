export default function () {
  const { $axios, entrypoint } = this

  return {
    /**
     * Fetch list of heroes
     * @param {Number} page
     * @param { String } name - hero name
     * @param { String } gender - hero gender
     * @param { String } status - hero status
     * @return {Promise<{pagination: *, payload: *}>}
     */
    list: async (page = 1, { name = '', gender = '', status = '' } = {}) => {
      const {
        data: { info: pagination, results: payload },
      } = await $axios.get(entrypoint, {
        params: { page, name, gender, status },
      })

      return { pagination: { ...pagination, page }, payload }
    },
    /**
     * Fetch information about hero by id
     * @param {Number} id - hero id
     * @return {Promise<void>}
     */
    getById: async (id) => {
      if (typeof id !== 'number') {
        throw new TypeError('Id must be a number')
      }

      const { data } = await $axios.get(`${entrypoint}/${id}`)

      return data
    },
  }
}
