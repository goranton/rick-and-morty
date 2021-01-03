import shortUUID from 'short-uuid'
import debounce from 'lodash/debounce'

export default (debounceTimeout = 250) => ({
  methods: {
    generateUniqueId() {
      return shortUUID.generate()
    },
    updateValue({ target: { value } }) {
      this.$emit('input', value)
    },
    updateValueDebounce: debounce(function (event) {
      this.updateValue(event)
    }, debounceTimeout),
  },
  computed: {
    fieldId() {
      return this.generateUniqueId()
    },
  },
})
