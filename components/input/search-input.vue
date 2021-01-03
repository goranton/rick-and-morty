<template>
  <div class="input input__search">
    <label for="search">Search</label>
    <input
      id="search"
      type="text"
      :value="value"
      @input="updateValueDebounce"
    />
  </div>
</template>

<script>
import FieldInputMixin from '../../mixins/field-input'

export default {
  name: 'SearchInput',
  mixins: [FieldInputMixin(500)],
  props: {
    value: {
      type: String,
      default: () => '',
    },
  },
}
</script>
