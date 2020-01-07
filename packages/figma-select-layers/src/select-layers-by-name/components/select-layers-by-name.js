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
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      transform: function (state) {
        const { layers, layerName, exactMatch } = state
        return {
          ...state,
          result: filterLayersByName(layers, layerName, exactMatch)
        }
      },
      validate: function ({ result }) {
        return result.length > 0
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ exactMatch, hasSelection, layerName, result }) {
        triggerEvent('SUBMIT', {
          exactMatch,
          hasSelection,
          layerName,
          result
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        hasSelection,
        layers
      }) {
        handleChange({ hasSelection, layers })
      })
    },
    [handleChange]
  )
  const { result, exactMatch, layerName, hasSelection } = state
  const count = result.length
  const scope = hasSelection ? 'within selection' : 'on page'
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Textbox
        name='layerName'
        placeholder='Layer name'
        value={layerName}
        onChange={handleChange}
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
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Select Layers
      </Button>
      <VerticalSpace space='small' />
      <Text muted align='center'>
        {count === 0
          ? `No matches ${scope}`
          : `${count} ${pluralize(count, 'match', 'matches')} ${scope}`}
      </Text>
      <VerticalSpace space='large' />
    </Container>
  )
}
