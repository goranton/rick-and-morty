<template>
  <div class="hero__icons">
    <icon-component
      v-if="statusIconName"
      class="hero__icon"
      :name="statusIconName"
    />
    <icon-component
      v-if="genderIconName"
      class="hero__icon"
      :name="genderIconName"
    />
  </div>
</template>

<script>
import IconComponent from '../common/icon'
import {
  HERO_GENDER_FEMALE,
  HERO_GENDER_MALE,
  HERO_GENDERS,
  HERO_STATUS_ALIVE,
  HERO_STATUS_DEAD,
  HERO_STATUSES,
} from '../../constants/hero'

export default {
  name: 'HeroIcons',
  components: { IconComponent },
  props: {
    gender: {
      type: String,
      validator: (gender) => HERO_GENDERS.includes(gender),
      required: true,
    },
    status: {
      type: String,
      validator: (status) => HERO_STATUSES.includes(status),
      required: true,
    },
  },
  computed: {
    statusIconName() {
      switch (this.status) {
        case HERO_STATUS_ALIVE:
          return 'heart'
        case HERO_STATUS_DEAD:
          return 'danger'
      }

      return false
    },
    genderIconName() {
      switch (this.gender) {
        case HERO_GENDER_FEMALE:
          return 'female'
        case HERO_GENDER_MALE:
          return 'male'
      }

      return false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/media';

.hero {
  &__icons {
    display: flex;
    justify-content: center;
  }
}

@include adaptive('phone') {
  .hero {
    &__icon {
      width: 15px;
      height: 15px;
    }
  }
}
@include adaptive('tablet') {
  .hero {
    &__icon {
      width: 20px;
      height: 20px;
    }
  }
}
@include adaptive('desktop') {
  .hero {
    &__icon {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
