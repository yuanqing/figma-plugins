/** @jsx h */
import {
  Button,
  Container,
  Header,
  TextboxNumeric,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export function DrawSliceOverSelection (initialState) {
  function submitCallback ({ padding }) {
    triggerEvent('DRAW_SLICE_OVER_SELECTION', {
      padding: parseFloat(padding)
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
    <Container>
      <Header>Padding</Header>
      <TextboxNumeric
        name='padding'
        onChange={handleInput}
        value={inputs.padding}
        focused
      />
      <Button
        fullWidth
        disabled={hasSelection === false || isNaN(parseFloat(inputs.padding))}
        onClick={handleSubmit}
        style={{ marginTop: '24px' }}
      >
        Draw Slice Over Selection
      </Button>
    </Container>
  )
}
