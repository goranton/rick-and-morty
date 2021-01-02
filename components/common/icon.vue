<template>
  <component :is="iconComponent" />
</template>

<script>
export default {
  name: 'IconComponent',
  props: {
    name: {
      type: String,
      default: () => null,
    },
    extension: {
      type: String,
      default: () => 'svg',
    },
  },
  data() {
    return {
      iconComponent: null,
    }
  },
  computed: {
    filename() {
      if (this.name) {
        return `${this.name}.${this.extension}`
      }

      return null
    },
  },
  created() {
    this.loadIconModule()
  },
  methods: {
    async loadIconModule() {
      if (!this.name) {
        return true
      }

      try {
        this.iconComponent = (
          await import(`@/static/icons/${this.filename}`)
        )?.default
      } catch {
        this.iconComponent = null
      }

      return module
    },
  },
}
</script>
