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
  }
}
