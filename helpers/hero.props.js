import { HERO_GENDERS, HERO_STATUSES } from '../constants/hero'

export function validateStatus(status) {
  return HERO_STATUSES.includes(status)
}

export function validateGender(gender) {
  return HERO_GENDERS.includes(gender)
}

export function validateLocation(location) {
  return 'name' in location
}
