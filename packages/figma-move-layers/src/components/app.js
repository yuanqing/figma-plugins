/** @jsx h */
import { triggerCommandEvent } from '@create-figma-plugin/utilities'
import { Button, InputWithIcon, useForm } from 'figma-ui'
import { h } from 'preact'
import './app.scss'

export function App (initialState) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    triggerCommandEvent('MOVE_LAYERS', {
      horizontalOffset: parseFloat(horizontalOffset),
      verticalOffset: parseFloat(verticalOffset)
    })
  }
  function cancelCallback () {
    triggerCommandEvent('CANCEL')
  }
  const { inputs, handleInputChange, handleSubmit } = useForm(
    initialState,
    submitCallback,
    cancelCallback
  )
  return (
    <div class='app'>
      <div class='app__input'>
        <InputWithIcon
          type='number'
          iconColor='black-3'
          iconName='arrow-left-right'
          name='horizontalOffset'
          onKeyUp={handleInputChange}
          value={inputs.horizontalOffset}
          focused
        />
      </div>
      <div class='app__input'>
        <InputWithIcon
          type='number'
          iconColor='black-3'
          iconName='arrow-up-down'
          name='verticalOffset'
          onKeyUp={handleInputChange}
          value={inputs.verticalOffset}
        />
      </div>
      <div class='app__button'>
        <Button type='primary' onClick={handleSubmit}>
          Move Selected Layers
        </Button>
      </div>
    </div>
  )
}
