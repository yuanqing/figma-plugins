/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/Button'
import { InputWithIcon } from 'figma-ui/src/components/InputWithIcon'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './move-layers.scss'

export function MoveLayers (initialState) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    triggerEvent('MOVE_LAYERS', {
      horizontalOffset: parseFloat(horizontalOffset),
      verticalOffset: parseFloat(verticalOffset)
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
    <div class='move-layers'>
      <div class='move-layers__input'>
        <InputWithIcon
          type='number'
          iconColor='black-3'
          iconName='arrow-left-right'
          name='horizontalOffset'
          onChange={handleInput}
          value={inputs.horizontalOffset}
          focused
        />
      </div>
      <div class='move-layers__input'>
        <InputWithIcon
          type='number'
          iconColor='black-3'
          iconName='arrow-up-down'
          name='verticalOffset'
          onChange={handleInput}
          value={inputs.verticalOffset}
        />
      </div>
      <div class='move-layers__button'>
        <Button type='primary' onClick={handleSubmit}>
          Move Selected Layers
        </Button>
      </div>
    </div>
  )
}
