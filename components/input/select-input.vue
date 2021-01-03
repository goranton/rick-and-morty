<template>
  <div class="input input__select">
    <label :for="fieldId">{{ label }}</label>
    <select :id="fieldId" @input="updateValue">
      <option
        v-for="{ id, value: fieldValue, label: fieldLabel } in itemsWithIds"
        :key="id"
        :value="fieldValue"
        :selected="value === fieldValue"
      >
        {{ fieldLabel }}
      </option>
    </select>
  </div>
</template>

<script>
import FieldInputMixin from '../../mixins/field-input'

export default {
  name: 'SelectInput',
  mixins: [FieldInputMixin()],
  props: {
    label: {
      type: String,
      default: () => '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    items: {
      type: Array,
      validator: (items) =>
        items.every((item) => 'label' in item && 'value' in item),
      required: true,
    },
  },
  computed: {
    itemsWithIds() {
      return [...this.items].map((item) => ({
        ...item,
        id: this.generateUniqueId(),
      }))
    },
  },
}
</script>
