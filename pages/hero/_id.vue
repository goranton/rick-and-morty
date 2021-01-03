<template>
  <div class="hero__details container">
    <div class="hero__head">
      <hero-image :image="hero.image" :alt="hero.name" />
      <div class="hero__personal">
        <hero-title class="hero__name" :title="hero.name" />
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
        <div class="hero__location">
          {{ hero.species }} - {{ hero.location.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { CONSTANTS } from '../../store/heroes'
import HeroImage from '../../components/hero/hero-image'
import HeroTitle from '../../components/hero/hero-title'
import IconComponent from '../../components/common/icon'
import {
  HERO_GENDER_FEMALE,
  HERO_GENDER_MALE,
  HERO_STATUS_ALIVE,
  HERO_STATUS_DEAD,
} from '../../constants/hero'

export default {
  name: 'HeroDetails',
  components: { IconComponent, HeroTitle, HeroImage },
  async fetch({ store: { dispatch }, params: { id } }) {
    await dispatch(`heroes/${CONSTANTS.ACTIONS.LOAD_HERO}`, +id)
  },
  computed: {
    ...mapGetters('heroes', {
      hero: CONSTANTS.GETTERS.GET_HERO,
    }),
    statusIconName() {
      switch (this.hero.status) {
        case HERO_STATUS_ALIVE:
          return 'heart'
        case HERO_STATUS_DEAD:
          return 'danger'
      }

      return false
    },
    genderIconName() {
      switch (this.hero.gender) {
        case HERO_GENDER_FEMALE:
          return 'female'
        case HERO_GENDER_MALE:
          return 'male'
      }

      return false
    },
  },
  beforeDestroy() {
    this.resetHero()
  },
  methods: mapMutations('heroes', {
    resetHero: CONSTANTS.MUTATIONS.RESET_HERO,
  }),
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

  &__icons {
    display: flex;
    justify-content: center;
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

    &__name,
    &__icons,
    &__personal {
      padding: 12px 0;
    }

    &__icon {
      width: 15px;
      height: 15px;
    }
  }
}
@include adaptive('tablet') {
  .hero {
    &__head {
      flex-direction: row;
    }

    &__name,
    &__icons,
    &__personal {
      padding: 15px 0;
    }

    &__icon {
      width: 20px;
      height: 20px;
    }
  }
}
@include adaptive('desktop') {
  .hero {
    &__head {
      flex-direction: row;
    }

    &__name,
    &__icons,
    &__personal {
      padding: 20px 0;
    }

    &__icon {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
