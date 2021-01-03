import Vue from 'vue'

Vue.directive('lazy-image', {
  inserted: (el, { value }) => {
    if (el.nodeName !== 'IMG') {
      return true
    }

    const loadImage = () => (el.src = value)
    const handler = (entries) => {
      entries.forEach(({ isIntersecting }, observer) => {
        if (isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    const createObserver = () => {
      const observer = new IntersectionObserver(handler, {
        root: null,
        threshold: '0',
      })

      observer.observe(el)
    }

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      createObserver()
    } else {
      loadImage()
    }
  },
})
