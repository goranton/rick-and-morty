<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  beforeDestroy() {
    // eslint-disable-next-line no-unused-vars
    const [_, destroy] = this.$scroller
    destroy()
  },
}
</script>
