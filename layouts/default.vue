<template>
  <div>
    <menu-component :items="navigation" fixed-position="bottom" fixed />
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MenuComponent from '../components/menu/menu'
export default {
  components: { MenuComponent },
  computed: mapState('core', {
    navigation: ({ navigation }) => navigation,
  }),
  beforeDestroy() {
    // eslint-disable-next-line no-unused-vars
    const [_, destroy] = this.$scroller
    destroy()
  },
}
</script>
