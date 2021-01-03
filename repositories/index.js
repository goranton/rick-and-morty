import heroesRepository from './heroes.repository'
import episodesRepository from './episodies.repository'

const repositories = [
  [
    {
      name: 'heroes',
      entrypoint: 'character',
    },
    heroesRepository,
  ],
  [
    {
      name: 'episodes',
      entrypoint: 'episode',
    },
    episodesRepository,
  ],
]

export default (dependencies = {}) =>
  repositories.reduce((stack, [{ name, entrypoint }, callback]) => {
    if (typeof callback === 'function') {
      stack[name] = callback.apply({
        entrypoint,
        ...dependencies,
      })
    }

    return stack
  }, {})
