import eventEmitterWrapper from '../helpers/emiter.event'

export default (ctx, inject) => {
  inject('messageBus', eventEmitterWrapper())
}
