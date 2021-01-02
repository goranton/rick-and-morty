<template>
  <div v-if="heroes" class="container">
    <grid :items="heroes">
      <template v-slot:default="{ columns }">
        <grid-column v-for="(items, index) in columns" :key="index">
          <hero-card v-for="hero in items" :key="hero.id" v-bind="hero" />
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

export default {
  components: { GridColumn, Grid, HeroCard },
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
      nextPageOfHeroes: CONSTANTS.ACTIONS.LOAD_NEXT_PAGE,
    }),
    ...mapMutations('heroes', {
      resetHeroes: CONSTANTS.MUTATIONS.RESET_HEROES,
    }),
  },
}
</script>
