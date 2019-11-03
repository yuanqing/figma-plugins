/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { InputWithIcon } from 'figma-ui/src/components/input-with-icon'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './draw-slice-over-selection.scss'

export function DrawSliceOverSelection (initialState) {
  function submitCallback ({ padding }) {
    triggerEvent('DRAW_SLICE_OVER_SELECTION', {
      padding: parseFloat(padding)
    })
  }
  function cancelCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    cancelCallback
  )
  return (
    <div class='draw-slice-over-selection'>
      <div class='draw-slice-over-selection__label'>Set slice padding…</div>
      <div class='draw-slice-over-selection__input'>
        <InputWithIcon
          type='number'
          iconColor='black-3'
          iconName='group'
          name='padding'
          onChange={handleInput}
          value={inputs.padding}
          focused
        />
      </div>
      <div class='draw-slice-over-selection__button'>
        <Button type='primary' onClick={handleSubmit}>
          Draw Slice Over Selection
        </Button>
      </div>
    </div>
  )
}
