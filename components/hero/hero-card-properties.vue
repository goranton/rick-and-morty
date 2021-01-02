<template>
  <div class="hero-card__properties">
    <icon-component
      class="hero-card__status"
      :class="{
        [`hero-card__status--${status.toLowerCase()}`]: true,
      }"
      :name="statusIconName"
    />
    <icon-component
      class="hero-card__gender"
      :class="{
        [`hero-card__gender--${gender.toLowerCase()}`]: true,
      }"
      :name="genderIconName"
    />
  </div>
</template>

<script>
import {
  HERO_GENDER_FEMALE,
  HERO_GENDER_MALE,
  HERO_GENDERS,
  HERO_STATUS_ALIVE,
  HERO_STATUS_DEAD,
  HERO_STATUSES,
} from '../../constants/hero'
import IconComponent from '../common/icon'

export default {
  name: 'HeroCardProperties',
  components: { IconComponent },
  props: {
    status: {
      type: String,
      validator: (status) => HERO_STATUSES.includes(status),
      required: true,
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
  },
  computed: {
    isAlive() {
      return this.status === HERO_STATUS_ALIVE
    },
    isMale() {
      return this.gender === HERO_GENDER_MALE
    },
    statusIconName() {
      switch (this.status) {
        case HERO_STATUS_ALIVE:
          return 'heart'
        case HERO_STATUS_DEAD:
          return 'danger'
      }

      return null
    },
    genderIconName() {
      switch (this.gender) {
        case HERO_GENDER_MALE:
          return 'male'
        case HERO_GENDER_FEMALE:
          return 'female'
      }
      return null
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/media';

.hero-card {
  &__properties {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__status {
    &--alive {
      &,
      & * {
        fill: green;
      }
    }

    &--dead {
      &,
      & * {
        fill: red;
      }
    }
  }

  &__gender {
    &--male {
      &,
      & * {
        fill: blue;
      }
    }

    &--female {
      &,
      & * {
        fill: pink;
      }
    }
  }
}

@include adaptive('phone') {
  .hero-card {
    &__status,
    &__gender {
      width: 15px;
      height: 15px;
      margin: 3px;
    }
  }
}

@include adaptive('tablet') {
  .hero-card {
    &__status,
    &__gender {
      width: 20px;
      height: 20px;
      margin: 4px;
    }
  }
}

@include adaptive('desktop') {
  .hero-card {
    &__status,
    &__gender {
      width: 25px;
      height: 25px;
      margin: 5px;
    }
  }
}
</style>
