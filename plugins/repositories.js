import createRepositories from '../repositories'

export default ({ $axios }, inject) => {
  inject('repositories', createRepositories({ $axios }))
}
