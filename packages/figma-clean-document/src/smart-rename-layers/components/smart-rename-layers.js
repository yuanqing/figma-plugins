/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Input } from 'figma-ui/src/components/input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './smart-rename-layers.scss'

export function SmartRenameLayers (initialState) {
  function submitCallback (settings) {
    triggerEvent('SMART_RENAME_LAYERS', settings)
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  const { smartRenameLayersWhitelist } = inputs
  return (
    <div class='smart-rename-layers'>
      <div class='smart-rename-layers__label'>Ignore layers named…</div>
      <div class='smart-rename-layers__input'>
        <Input
          type='text'
          border
          name='smartRenameLayersWhitelist'
          onChange={handleInput}
          value={smartRenameLayersWhitelist}
          focused
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
