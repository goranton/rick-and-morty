<template>
  <div class="hero-filters">
    <search-input :value="name" @input="nameUpdate" />
    <div class="hero-filter__selectors">
      <select-input
        label="Gender"
        :items="gendersAsFilter"
        :value="gender"
        @input="genderUpdate"
      />
      <select-input
        label="Status"
        :items="statusesAsFilter"
        :value="status"
        @input="statusUpdate"
      />
    </div>
  </div>
</template>

<script>
import SearchInput from '../input/search-input'
import { HERO_GENDERS, HERO_STATUSES } from '../../constants/hero'
import SelectInput from '../input/select-input'
import { validateGender, validateStatus } from '../../helpers/hero.props'

export default {
  name: 'HeroFilters',
  components: { SelectInput, SearchInput },
  props: {
    name: {
      type: String,
      default: () => '',
    },
    gender: {
      type: String,
      validator: validateGender,
      default: () => '',
    },
    status: {
      type: String,
      validator: validateStatus,
      default: () => '',
    },
  },
  computed: {
    gendersAsFilter() {
      return [...HERO_GENDERS].map((gender) => ({
        label: gender,
        value: gender.toLowerCase(),
      }))
    },
    statusesAsFilter() {
      return [...HERO_STATUSES].map((status) => ({
        label: status,
        value: status.toLowerCase(),
      }))
    },
  },
  mounted() {
    this.update({})
  },
  methods: {
    update(filters) {
      this.$emit(
        'input',
        Object.fromEntries(
          Object.entries({
            ...this.$props,
            ...filters,
          }).filter(([name, value]) => value)
        )
      )
    },
    nameUpdate(name) {
      this.update({ name })
    },
    genderUpdate(gender) {
      this.update({ gender })
    },
    statusUpdate(status) {
      this.update({ status })
    },
  },
}
</script>

<style lang="scss" scoped>
.hero-filter {
  &__selectors {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
