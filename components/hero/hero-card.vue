<template>
  <div class="hero-card">
    <div class="hero-card__wrapper">
      <hero-image :image="image" :alt="name" polygon darken />
      <hero-title :title="name" />
    </div>
  </div>
</template>

<script>
import HeroTitle from './hero-title'
import HeroImage from './hero-image'
export default {
  name: 'HeroCard',
  components: { HeroImage, HeroTitle },
  props: {
    image: {
      type: String,
      default: () => '',
    },
    name: {
      type: [String, null],
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/media';

.hero-card {
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
  }
}
</style>
