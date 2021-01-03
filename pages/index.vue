<template>
  <div class="container">
    <hero-filters v-bind="$route.query" @input="filterHeroes" />
    <grid v-if="heroes" :items="heroes">
      <template v-slot:default="{ columns }">
        <grid-column v-for="(items, index) in columns" :key="index">
          <nuxt-link
            v-for="hero in items"
            :key="hero.id"
            v-bind="hero"
            :to="{ name: 'hero-id', params: { id: hero.id } }"
          >
            <hero-card :name="hero.name" :image="hero.image" />
          </nuxt-link>
        </grid-column>
      </template>
    </grid>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import HeroCard from '../components/hero/hero-card'
import { CONSTANTS } from '../store/heroes'
import Grid from '../components/grid/grid'
import GridColumn from '../components/grid/grid-column'
import PaginationScrollMixin, {
  nextEventName,
} from '../mixins/pagination-scroll'
import HeroFilters from '../components/hero/hero-filters'

export default {
  components: { HeroFilters, GridColumn, Grid, HeroCard },
  mixins: [PaginationScrollMixin(2000)],
  async fetch({ store }) {
    await store.dispatch(`heroes/${CONSTANTS.ACTIONS.LOAD_HEROES}`)
  },
  computed: mapGetters('heroes', {
    heroes: CONSTANTS.GETTERS.GET_HEROES,
  }),
  mounted() {
    this.$on(nextEventName, this.nextPageOfHeroes)
  },
  beforeDestroy() {
    this.$off(nextEventName, this.nextPageOfHeroes)
  },
  methods: {
    ...mapActions('heroes', {
      loadHeroes: CONSTANTS.ACTIONS.LOAD_HEROES,
      nextPageOfHeroes: CONSTANTS.ACTIONS.LOAD_NEXT_PAGE,
    }),
    ...mapMutations('heroes', {
      resetHeroes: CONSTANTS.MUTATIONS.RESET_HEROES,
      updateFilters: CONSTANTS.MUTATIONS.UPDATE_FILTERS,
    }),
    filterHeroes(filter) {
      this.$router.push({ query: filter })
      this.updateFilters(filter)
      this.loadHeroes()
    },
  },
}
</script>
