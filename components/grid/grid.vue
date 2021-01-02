<template>
  <div v-if="items" class="grid">
    <slot :columns="columns" />
  </div>
</template>

<script>
import {
  DESKTOP_SCREEN,
  PHONE_SCREEN,
  TABLET_SCREEN,
} from '../../constants/breakpoints'

export default {
  name: 'Grid',
  props: {
    items: {
      type: Array,
      required: true,
    },
    breakpoints: {
      type: Array,
      default: () => [
        [PHONE_SCREEN, 1],
        [TABLET_SCREEN, 2],
        [DESKTOP_SCREEN, 3],
      ],
    },
  },
  data() {
    return {
      columnsCount: 1,
    }
  },
  computed: {
    itemsCountInColumn() {
      return Math.ceil(this.items.length / this.columnsCount)
    },
    columns() {
      const columns = []

      this.items.forEach((item, index) => {
        const position = index % this.columnsCount

        if (index < this.columnsCount) {
          columns[index] = [item]
        } else {
          columns[position].push(item)
        }
      })

      return columns
    },
  },
  mounted() {
    window.addEventListener('resize', this.calculateColumnsCount)
    this.calculateColumnsCount()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateColumnsCount)
  },
  methods: {
    calculateColumnsCount() {
      if (typeof window === 'undefined') {
        return 1
      }

      const windowWidth = window.innerWidth

      const foundBreakpoint = this.breakpoints.find(([[start, stop]]) => {
        return start < windowWidth && (stop > windowWidth || stop === 0)
      })

      this.columnsCount = foundBreakpoint[1]
    },
  },
}
</script>

<style lang="scss" scoped>
.grid {
  display: flex;

  & > .grid__column {
    width: 100%;
  }
}
</style>
