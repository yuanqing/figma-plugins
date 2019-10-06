/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/Button'
import { InputWithIcon } from 'figma-ui/src/components/InputWithIcon'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './distribute-layers.scss'

export function DistributeLayers ({ direction, iconName, ...initialState }) {
  function submitCallback ({ space }) {
    triggerEvent('DISTRIBUTE_LAYERS', {
      space: parseFloat(space)
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
    <div class='distribute-layers'>
      <div class='distribute-layers__input'>
        <InputWithIcon
          type='number'
          iconColor='black-3'
          iconName={iconName}
          name='space'
          onChange={handleInput}
          value={inputs.space}
          focused
        />
      </div>
      <div class='distribute-layers__button'>
        <Button type='primary' onClick={handleSubmit}>
          Distribute Layers {direction}
        </Button>
      </div>
    </div>
  )
}
