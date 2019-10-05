/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button, InputWithIcon, useForm } from 'figma-ui'
import { h } from 'preact'
import './app.scss'

export function App (initialState) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    console.log('submitCallback', horizontalOffset, verticalOffset)
    triggerEvent('MOVE_LAYERS', {
      horizontalOffset: parseFloat(horizontalOffset),
      verticalOffset: parseFloat(verticalOffset)
    })
  }
  function cancelCallback () {
    triggerEvent('CANCEL')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
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
          onInput={handleInput}
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
          onInput={handleInput}
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
