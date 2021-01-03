<template>
  <div v-if="hero" class="hero__details container">
    <hero-head
      :name="hero.name"
      :image="hero.image"
      :status="hero.status"
      :species="hero.species"
      :gender="hero.gender"
      :location="hero.location"
    />
    <div class="hero-episodes">
      <hero-title
        class="hero__row"
        :title="`Episodes (${hero.episode.length})`"
      />
      <grid :items="hero.episode">
        <template v-slot:default="{ columns }">
          <grid-column v-for="(column, index) in columns" :key="index">
            <hero-episode
              v-for="{ id, name, episode, air_date } in column"
              :key="id"
              :name="name"
              :episode="episode"
              :air-date="air_date"
            />
          </grid-column>
        </template>
      </grid>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { CONSTANTS } from '../../store/heroes'
import HeroHead from '../../components/hero/hero-head'
import Grid from '../../components/grid/grid'
import GridColumn from '../../components/grid/grid-column'
import HeroTitle from '../../components/hero/hero-title'
import HeroEpisode from '../../components/hero/hero-episode'

export default {
  name: 'HeroDetails',
  components: { HeroEpisode, HeroTitle, GridColumn, Grid, HeroHead },
  async fetch({ store: { dispatch }, params: { id } }) {
    await dispatch(`heroes/${CONSTANTS.ACTIONS.LOAD_HERO}`, +id)
  },
  computed: mapGetters('heroes', {
    hero: CONSTANTS.GETTERS.GET_HERO,
  }),
  beforeDestroy() {
    this.resetHero()
  },
  methods: mapMutations('heroes', {
    resetHero: CONSTANTS.MUTATIONS.RESET_HERO,
  }),
}
</script>

<style lang="scss" scoped>
.hero__details {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  //align-items: ;
  justify-content: center;
}
.hero-episodes {
  text-align: center;
}
</style>
