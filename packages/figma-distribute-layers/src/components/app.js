/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button, InputWithIcon, useForm } from 'figma-ui'
import { h } from 'preact'
import './app.scss'

export function App ({ direction, iconName, ...initialState }) {
  function submitCallback ({ space }) {
    triggerEvent('DISTRIBUTE_LAYERS', {
      space: parseFloat(space)
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
          iconName={iconName}
          name='space'
          onKeyUp={handleInput}
          value={inputs.space}
          focused
        />
      </div>
      <div class='app__button'>
        <Button type='primary' onClick={handleSubmit}>
          Distribute Layers {direction}
        </Button>
      </div>
    </div>
  )
}
