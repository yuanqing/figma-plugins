/** @jsx h */
import {
  Button,
  Columns,
  Container,
  TextboxNumeric,
  VerticalSpace,
  moveDownIcon,
  moveRightIcon,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export function MoveLayers (initialState) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    triggerEvent('MOVE_LAYERS', {
      horizontalOffset: castToNumber(horizontalOffset),
      verticalOffset: castToNumber(verticalOffset)
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  const [hasSelection, setHasSelection] = useState(true)
  useEffect(function () {
    addEventListener('SELECTION_CHANGED', function (hasSelection) {
      setHasSelection(hasSelection)
    })
  }, [])
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Columns space='extraSmall'>
        <TextboxNumeric
          name='horizontalOffset'
          icon={moveRightIcon}
          onChange={handleInput}
          value={inputs.horizontalOffset}
          focused
        />
        <TextboxNumeric
          name='verticalOffset'
          icon={moveDownIcon}
          onChange={handleInput}
          value={inputs.verticalOffset}
        />
      </Columns>
      <VerticalSpace space='large' />
      <Button
        fullWidth
        disabled={
          hasSelection === false ||
          (castToNumber(inputs.horizontalOffset) === 0 &&
            castToNumber(inputs.verticalOffset) === 0)
        }
        onClick={handleSubmit}
      >
        Move Layers
      </Button>
    </Container>
  )
}

function castToNumber (string) {
  const result = parseFloat(string)
  return isNaN(result) === true ? 0 : result
}
