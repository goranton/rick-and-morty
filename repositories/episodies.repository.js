export default function () {
  const { $axios, entrypoint } = this

  return {
    async getManyByIds(ids) {
      if (!Array.isArray(ids)) {
        throw new TypeError('Ids must be array')
      }

      const { data } = await $axios.get(`${entrypoint}/${ids.join()}`)
      return Array.isArray(data) ? data : [data]
    },
  }
}
