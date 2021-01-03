<template>
  <div class="hero-details"></div>
</template>

<script>
import { mapMutations } from 'vuex'
import { CONSTANTS } from '../../store/heroes'

export default {
  name: 'HeroDetails',
  async fetch({ store, params: { id } }) {
    await store.dispatch(`heroes/${CONSTANTS.ACTIONS.LOAD_HERO}`, +id)
  },
  beforeDestroy() {
    this.resetHero()
  },
  methods: mapMutations('heroes', {
    resetHero: CONSTANTS.MUTATIONS.RESET_HERO,
  }),
}
</script>
