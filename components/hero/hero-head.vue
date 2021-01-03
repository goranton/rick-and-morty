<template>
  <div class="hero__head">
    <hero-image :image="image" :alt="name" />
    <div class="hero__personal">
      <hero-title class="hero__row hero__name" :title="name" />
      <hero-icons class="hero__row" :status="status" :gender="gender" />
      <div class="hero__row hero__location">
        {{ species }} - {{ location.name }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  validateGender,
  validateLocation,
  validateStatus,
} from '../../helpers/hero.props'

import HeroImage from './hero-image'
import HeroTitle from './hero-title'
import HeroIcons from './hero-icons'

export default {
  name: 'HeroHead',
  components: { HeroIcons, HeroTitle, HeroImage },
  props: {
    image: { type: String, required: true },
    name: { type: String, required: true },
    species: { type: String, required: true },
    status: { type: String, validator: validateStatus, required: true },
    gender: { type: String, validator: validateGender, required: true },
    location: { type: Object, validator: validateLocation, required: true },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/media';

.hero {
  &__head {
    display: flex;
    overflow: hidden;

    & > &:nth-child(2n + 1) {
      margin-right: 20px;
    }
  }

  &__personal {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@include adaptive('phone') {
  .hero {
    &__head {
      flex-direction: column;
    }

    &__image {
      text-align: center;
    }

    &__row {
      padding: 12px 0;
    }
  }
}
@include adaptive('tablet') {
  .hero {
    &__head {
      flex-direction: row;
    }

    &__row {
      padding: 15px 0;
    }
  }
}
@include adaptive('desktop') {
  .hero {
    &__head {
      flex-direction: row;
    }

    &__row {
      padding: 20px 0;
    }
  }
}
</style>
