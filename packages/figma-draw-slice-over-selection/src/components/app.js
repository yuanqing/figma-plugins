/** @jsx h */
import { triggerCommandEvent } from '@create-figma-plugin/utilities'
import { Button, InputWithIcon, useForm } from 'figma-ui'
import { h } from 'preact'
import './app.scss'

export function App (initialState) {
  function submitCallback ({ padding }) {
    triggerCommandEvent('DRAW_SLICE_OVER_SELECTION', {
      padding: parseFloat(padding)
    })
  }
  function cancelCallback () {
    triggerCommandEvent('CANCEL')
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
          iconName='group'
          name='padding'
          onInput={handleInput}
          value={inputs.padding}
          focused
        />
      </div>
      <div class='app__button'>
        <Button type='primary' onClick={handleSubmit}>
          Draw Slice Over Selection
        </Button>
      </div>
    </div>
  )
}
