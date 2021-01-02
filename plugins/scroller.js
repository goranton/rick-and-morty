import eventEmitterWrapper from '../helpers/emiter.event'

export default (ctx, inject) => {
  const [actions, handler] = eventEmitterWrapper()
  window.addEventListener('scroll', handler)
  inject('scroller', [
    actions,
    () => {
      actions.destroy()
      window.removeEventListener('scroll', handler)
    },
  ])
}
