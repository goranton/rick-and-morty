import heroesRepository from './heroes.repository'

const repositories = [
  [
    {
      name: 'heroes',
      entrypoint: 'character',
    },
    heroesRepository,
  ],
]

export default (dependencies = {}) =>
  repositories.reduce((stack, [{ name, entrypoint }, callback]) => {
    if (typeof callback === 'function') {
      stack[name] = callback.bind({
        entrypoint,
        ...dependencies,
      })
    }

    return stack
  }, {})
