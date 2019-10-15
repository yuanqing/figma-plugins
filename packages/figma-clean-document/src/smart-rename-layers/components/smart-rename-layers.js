/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/Button'
import { InputWithLabel } from 'figma-ui/src/components/InputWithLabel'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './smart-rename-layers.scss'

export function SmartRenameLayers (initialState) {
  function submitCallback (settings) {
    triggerEvent('SMART_RENAME_LAYERS', settings)
  }
  function cancelCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    cancelCallback
  )
  const { smartRenameLayersWhitelist } = inputs
  return (
    <div class='smart-rename-layers'>
      <div class='smart-rename-layers__input'>
        <InputWithLabel
          type='text'
          disabled={inputs.smartRenameLayers === false}
          border
          label='Ignore layers named…'
          name='smartRenameLayersWhitelist'
          onChange={handleInput}
          value={smartRenameLayersWhitelist}
        />
      </div>
      <div class='smart-rename-layers__button'>
        <Button type='primary' onClick={handleSubmit}>
          Smart Rename Layers
        </Button>
      </div>
    </div>
  )
}
