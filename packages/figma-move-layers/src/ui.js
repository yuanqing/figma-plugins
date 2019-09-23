/** @jsx h */
import { Button, InputWithIcon, render, useForm } from 'figma-ui'
import { h } from 'preact'

export default render(function ({ postMessage, data }) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    postMessage({
      horizontalOffset: parseFloat(horizontalOffset),
      verticalOffset: parseFloat(verticalOffset)
    })
  }
  function cancelCallback () {
    postMessage(null)
  }
  const { inputs, handleInputChange, handleSubmit } = useForm(
    data,
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
})
