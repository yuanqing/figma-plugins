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
import { useEffect, useState } from 'preact/hooks'
import { FIT_PARENT, HEIGHT, WIDTH } from '../../constants'
import styles from './set-dimension.scss'

const dimensions = [
  FIT_PARENT,
  4,
  8,
  12,
  16,
  20,
  24,
  32,
  40,
  48,
  56,
  64,
  80,
  96,
  120
]

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
            { value: WIDTH, text: 'Width' },
            { value: HEIGHT, text: 'Height' }
          ]}
          onChange={setAttribute}
        />
        <VerticalSpace space='small' />
      </Container>
      <Divider />
      <div class={styles.dimensions}>
        {dimensions.map(function (dimension, index) {
          return (
            <SelectableItem
              key={index}
              disabled={isDisabled === true}
              data-dimension={dimension}
              selected={activeDimension === dimension}
              onClick={isDisabled === true ? null : handleDimensionClick}
            >
              {dimension === FIT_PARENT ? 'Fit parent' : dimension}
            </SelectableItem>
          )
        })}
      </div>
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
