import { Layer } from '../../types'
const slashRegex = /\//g

export function computeMaximumGroupDefinition(layers: Array<Layer>): number {
  let maximum = 1
  layers.forEach(function ({ name }) {
    const matches = name.match(slashRegex)
    if (matches !== null) {
      maximum = Math.max(maximum, matches.length)
    }
  })
  return maximum
}
