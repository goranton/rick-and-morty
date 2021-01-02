<template>
  <div class="hero-card__head">
    <div class="hero-card__image--polygon">
      <img class="hero-card__image" :src="image" :alt="name" />
    </div>
    <h2 class="hero-card__name">{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HeroCardHead',
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

<style lang="scss" scoped>
@import '../../assets/styles/media';

.hero-card {
  &__head {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    cursor: pointer;
  }

  &__name {
    text-align: center;
  }

  &__image {
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

      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: black;
        opacity: 0.4;
      }
    }
  }
}

@include adaptive('phone') {
  .hero-card {
    &__head {
      padding: 15px;
    }
    &__name {
      font-size: 1.2rem;
      line-height: 2.2rem;
      margin-top: 17px;
    }
  }
}

@include adaptive('tablet') {
  .hero-card {
    &__head {
      padding: 17px;
    }
    &__name {
      font-size: 1.7rem;
      line-height: 2.7rem;
      margin-top: 17px;
    }
  }
}

@include adaptive('desktop') {
  .hero-card {
    &__head {
      padding: 20px;
    }
    &__name {
      margin-top: 20px;
      font-size: 2rem;
      line-height: 3rem;
    }
  }
}
</style>
