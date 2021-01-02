<template>
  <div
    ref="menu"
    class="menu"
    :class="{
      'menu--fixed': fixed,
      [`menu--${fixedPosition}`]: fixed,
    }"
  >
    <div class="container">
      <div class="menu__wrapper">
        <menu-item
          v-for="{ id, icon, label, routeName } in items"
          :key="id"
          :icon="icon"
          :label="label"
          :route-name="routeName"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from './menu-item'
export default {
  name: 'MenuComponent',
  components: { MenuItem },
  props: {
    items: {
      type: Array,
      validator: (items) =>
        items.every((item) => {
          return 'id' in item && 'label' in item && 'routeName' in item
        }),
      required: true,
    },
    fixed: {
      type: Boolean,
      default: () => false,
    },
    fixedPosition: {
      type: String,
      validator: (position) => ['top', 'bottom'].includes(position),
      default: () => 'top',
    },
  },
  mounted() {
    if (this.fixed) {
      this.bodyPaddingAppend()
      window.addEventListener('resize', this.bodyPaddingAppend)
    }
  },
  beforeDestroy() {
    if (this.fixed) {
      window.removeEventListener('resize', this.bodyPaddingAppend)
    }
  },
  methods: {
    bodyPaddingAppend() {
      const { menu } = this.$refs
      const calculatePadding = `${menu.scrollHeight}px`

      if (!menu || typeof document === 'undefined') {
        return true
      }

      if (this.fixedPosition === 'bottom') {
        document.body.style.paddingBottom = calculatePadding
      } else {
        document.body.style.paddingTop = calculatePadding
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/media';

.menu {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  z-index: 2;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }

  &--fixed {
    position: fixed;
    left: 0;
  }

  &--top {
    top: 0;
  }

  &--bottom {
    bottom: 0;
  }
}
</style>
