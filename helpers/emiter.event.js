export default () => {
  const listeners = []

  return [
    {
      add(listener) {
        if (typeof listener !== 'function') {
          throw new TypeError('Listener must be a function')
        }

        listeners.push(listener)
      },
      remove(listener) {
        const found = listeners.indexOf(listener)
        found && listeners.splice(found, 1)
      },
      removeAll() {
        Array.isArray(listeners) && listeners.forEach(this.remove.bind(this))
      },
      destroy() {
        this.removeAll()
      },
    },
    (message) => {
      if (Array.isArray(listeners)) {
        listeners.forEach((listener) => {
          listener(message)
        })
      }
    },
  ]
}
