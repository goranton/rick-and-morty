import debounce from 'lodash/debounce'

export const nextEventName = 'paginationScrollMixin:next'

export default (breakpoint) => {
  return {
    mounted() {
      const [{ add }] = this.$scroller
      add(this.$_paginationScroll_listener)
    },
    beforeDestroy() {
      const [{ remove }] = this.$scroller
      remove(this.$_paginationScroll_listener)
    },
    methods: {
      $_paginationScroll_listener: debounce(function () {
        const { scrollY, innerHeight } = window
        const { scrollHeight } = document.body

        if (scrollHeight - scrollY - innerHeight <= breakpoint) {
          this.$emit(nextEventName)
        }
      }, 150),
    },
  }
}
