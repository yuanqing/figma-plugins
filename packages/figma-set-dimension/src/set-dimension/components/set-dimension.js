/** @jsx h */
import {
  Container,
  Divider,
  SegmentedControl,
  SelectableItem,
  VerticalSpace
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  removeEventListener,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { dimensions } from '../../dimensions'
import { HEIGHT, WIDTH } from '../../constants'

const ESCAPE_KEY_CODE = 27
const LEFT_KEY_CODE = 37
const UP_KEY_CODE = 38
const RIGHT_KEY_CODE = 39
const DOWN_KEY_CODE = 40

export function SetDimension (initialState) {
  const [attribute, setAttribute] = useState(initialState.attribute)
  const [layers, setLayers] = useState(initialState.layers)
  function handleDimensionClick (event) {
    const dimension = parseInt(event.target.getAttribute('data-dimension'))
    triggerEvent('SET_DIMENSION', {
      attribute,
      dimension
    })
  }
  useEffect(
    function () {
      addEventListener('SELECTION_CHANGED', setLayers)
      return function () {
        removeEventListener('SELECTION_CHANGED', setLayers)
      }
    },
    [setLayers]
  )
  const handleKeyDown = useCallback(
    function (event) {
      if (event.keyCode === ESCAPE_KEY_CODE) {
        triggerEvent('CLOSE')
        return
      }
      let dimension = null
      const index = dimensions.indexOf(
        computeActiveDimension(layers, attribute)
      )
      if (event.keyCode === UP_KEY_CODE || event.keyCode === LEFT_KEY_CODE) {
        dimension = dimensions[index === 0 ? dimensions.length - 1 : index - 1]
      }
      if (event.keyCode === DOWN_KEY_CODE || event.keyCode === RIGHT_KEY_CODE) {
        dimension = dimensions[index === dimensions.length - 1 ? 0 : index + 1]
      }
      if (dimension === null) {
        return
      }
      triggerEvent('SET_DIMENSION', {
        attribute,
        dimension
      })
    },
    [attribute, layers]
  )
  useEffect(
    function () {
      window.addEventListener('keydown', handleKeyDown)
      return function () {
        window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [handleKeyDown]
  )
  const isDisabled = layers.length === 0
  const activeDimension = computeActiveDimension(layers, attribute)
  return (
    <div>
      <Container space='medium'>
        <VerticalSpace space='small' />
        <SegmentedControl
          name='attribute'
          value={attribute}
          options={[
            { value: WIDTH, text: 'Width', disabled: isDisabled },
            { value: HEIGHT, text: 'Height', disabled: isDisabled }
          ]}
          onChange={setAttribute}
        />
        <VerticalSpace space='small' />
      </Container>
      <Divider />
      {dimensions.map(function (dimension, index) {
        return (
          <SelectableItem
            key={index}
            disabled={isDisabled === true}
            data-dimension={dimension}
            selected={activeDimension === dimension}
            onClick={isDisabled === true ? null : handleDimensionClick}
          >
            {dimension}
          </SelectableItem>
        )
      })}
    </div>
  )
}

function computeActiveDimension (layers, attribute) {
  if (layers.length === 0) {
    return null
  }
  const [firstLayer, ...rest] = layers
  const result = firstLayer[attribute]
  for (const layer of rest) {
    if (result !== layer[attribute]) {
      return null
    }
  }
  return result
}
