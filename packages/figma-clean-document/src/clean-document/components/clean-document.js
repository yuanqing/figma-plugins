/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button, Checkbox, InputWithLabel, useForm } from 'figma-ui'
import { h } from 'preact'
import './clean-document.scss'

export function CleanDocument (initialState) {
  function submitCallback (settings) {
    triggerEvent('CLEAN_DOCUMENT', settings)
  }
  function cancelCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    cancelCallback
  )
  const {
    sortPages,
    deleteHiddenLayers,
    smartRenameLayers,
    smartRenameLayersWhitelist,
    smartSortLayers
  } = inputs
  const isSubmitButtonEnabled =
    sortPages || deleteHiddenLayers || smartRenameLayers || smartSortLayers
  return (
    <div class='clean-document'>
      <div class='clean-document__checkbox'>
        <Checkbox
          title='Sort pages'
          name='sortPages'
          onChange={handleInput}
          value={sortPages}
        />
      </div>
      <div class='clean-document__checkbox'>
        <Checkbox
          title='Delete hidden layers'
          name='deleteHiddenLayers'
          onChange={handleInput}
          value={deleteHiddenLayers}
        />
      </div>
      <div class='clean-document__checkbox'>
        <Checkbox
          title='Smart rename layers'
          name='smartRenameLayers'
          onChange={handleInput}
          value={smartRenameLayers}
        />
      </div>
      <div class='clean-document__input'>
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
      <div class='clean-document__checkbox'>
        <Checkbox
          title='Smart sort layers'
          description='Sort layers by their X and Y position while maintaining their stacking order on the page'
          name='smartSortLayers'
          onChange={handleInput}
          value={smartSortLayers}
        />
      </div>
      <div class='clean-document__button'>
        <Button
          type='primary'
          disabled={isSubmitButtonEnabled === false}
          onClick={isSubmitButtonEnabled && handleSubmit}
        >
          Clean Document
        </Button>
      </div>
    </div>
  )
}
