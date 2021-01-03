<template>
  <div
    class="hero__image"
    :class="{ 'hero__image--polygon': polygon, 'hero__image--darken': darken }"
  >
    <img v-lazy-image="image" src="" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: 'HeroImage',
  props: {
    image: {
      type: String,
      default: () => '',
    },
    alt: {
      type: String,
      default: () => '',
    },
    polygon: {
      type: Boolean,
      default: () => false,
    },
    darken: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style lang="scss" scoped>
.hero__image {
  &--polygon {
    position: relative;
    clip-path: polygon(
      53% 91%,
      63% 90%,
      74% 93%,
      88% 88%,
      83% 69%,
      88% 54%,
      93% 40%,
      90% 24%,
      78% 10%,
      60% 11%,
      41% 9%,
      29% 5%,
      24% 10%,
      17% 11%,
      14% 20%,
      8% 33%,
      4% 40%,
      6% 50%,
      1% 63%,
      4% 74%,
      10% 81%,
      19% 91%,
      31% 93%,
      44% 94%
    );
  }

  &--darken {
    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: black;
      opacity: 0.4;
      transition: 250ms opacity;
    }

    &:hover {
      &::after {
        opacity: 0;
      }
    }
  }
}
</style>
