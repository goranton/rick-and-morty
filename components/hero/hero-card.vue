<template>
  <div class="hero-card">
    <div class="hero-card__wrapper">
      <hero-card-head :name="name" :image="image" />
      <hero-card-properties :status="status" :type="type" :gender="gender" />
    </div>
  </div>
</template>

<script>
import { HERO_GENDERS, HERO_STATUSES } from '../../constants/hero'
import HeroCardHead from './hero-card-head'
import HeroCardProperties from './hero-card-properties'
export default {
  name: 'HeroCard',
  components: { HeroCardProperties, HeroCardHead },
  props: {
    image: {
      type: String,
      default: () => '',
    },
    name: {
      type: [String, null],
      required: true,
    },
    status: {
      type: String,
      validator: (status) => HERO_STATUSES.includes(status),
      required: true,
    },
    species: {
      type: String,
      default: () => '',
    },
    type: {
      type: String,
      default: () => '',
    },
    gender: {
      type: String,
      validator: (gender) => HERO_GENDERS.includes(gender),
      required: true,
    },
    location: {
      type: Object,
      validator: (location) => 'name' in location && 'url' in location,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.hero-card {
  &__wrapper {
    position: relative;
  }
}
</style>
