/** @jsx h */
import { triggerCommandEvent } from '@create-figma-plugin/utilities'
import { Button, InputWithIcon, render, useForm } from 'figma-ui'
import { h } from 'preact'

export default render(App)

function App (initialState) {
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
    <div class='ph2'>
      <div class='mv2'>
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
      <div class='mb2'>
        <InputWithIcon
          type='number'
          iconColor='black-3'
          iconName='arrow-up-down'
          name='verticalOffset'
          onKeyUp={handleInputChange}
          value={inputs.verticalOffset}
        />
      </div>
      <Button type='primary' onClick={handleSubmit}>
        Move Selected Layers
      </Button>
    </div>
  )
}
