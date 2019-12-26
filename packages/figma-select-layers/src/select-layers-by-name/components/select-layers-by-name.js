/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Text,
  Textbox,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  pluralize,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { filterLayersByName } from '../filter-layers-by-name'

export function SelectLayersByName (initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(initialState, {
    transform: function (state) {
      const { layers, layerName, exactMatch } = state
      return {
        ...state,
        count: filterLayersByName(layers, layerName, exactMatch).length
      }
    },
    validate: function ({ count }) {
      return count > 0
    },
    onClose: function () {
      triggerEvent('CLOSE')
    },
    onSubmit: function ({ exactMatch, layerName }) {
      triggerEvent('SUBMIT', {
        exactMatch,
        layerName
      })
    }
  })
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        hasSelection,
        layers
      }) {
        handleChange(hasSelection, 'hasSelection')
        handleChange(layers, 'layers')
      })
    },
    [handleChange]
  )
  const { count, exactMatch, layerName, hasSelection } = state
  const scope = hasSelection ? 'within selection' : 'on page'
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Layer name</Text>
      <VerticalSpace space='small' />
      <Textbox
        name='layerName'
        value={layerName}
        onChange={handleChange}
        propagateEscapeKeyDown
        focused
      />
      <VerticalSpace space='small' />
      <Checkbox
        name='exactMatch'
        value={exactMatch === true}
        onChange={handleChange}
      >
        <Text>Exact match</Text>
      </Checkbox>
      <VerticalSpace space='medium' />
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Select Layers
      </Button>
      <VerticalSpace space='small' />
      <Text muted align='center'>
        {count === 0
          ? `No matches ${scope}`
          : `${count} ${pluralize(count, 'match', 'matches')} ${scope}`}
      </Text>
      <VerticalSpace space='small' />
    </Container>
  )
}
