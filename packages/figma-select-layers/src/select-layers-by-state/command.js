import { commandFactory } from '../command-factory'

export const selectMaskLayers = commandFactory('mask layer', function (layer) {
  return layer.isMask === true
})

export const selectHiddenLayers = commandFactory('hidden layer', function (
  layer
) {
  return layer.visible === false
})

export const selectLockedLayers = commandFactory('locked layer', function (
  layer
) {
  return layer.locked === true
})
