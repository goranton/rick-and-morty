export default function () {
  const { $axios, entrypoint } = this

  return {
    /**
     * Fetch list of heroes
     * @param {Number} page
     * @return {Promise<{pagination: *, payload: *}>}
     */
    list: async (page = 1) => {
      const {
        data: { info: pagination, results: payload },
      } = await $axios.get(entrypoint, {
        params: { page },
      })

      return { pagination: { ...pagination, page }, payload }
    },
  }
}
