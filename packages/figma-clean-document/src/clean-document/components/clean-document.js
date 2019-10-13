/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/Button'
import { Checkbox } from 'figma-ui/src/components/Checkbox'
import { SegmentedControl } from 'figma-ui/src/components/SegmentedControl'
import { InputWithLabel } from 'figma-ui/src/components/InputWithLabel'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import { DOCUMENT, PAGE, SELECTION } from '../scope'
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
    deleteHiddenLayers,
    scope,
    smartRenameLayers,
    smartRenameLayersWhitelist,
    smartSortLayers,
    sortPages
  } = inputs
  const isSubmitButtonEnabled =
    sortPages === true ||
    deleteHiddenLayers === true ||
    smartRenameLayers === true ||
    smartSortLayers === true
  return (
    <div class='clean-document'>
      <div class='clean-document__scope'>
        <SegmentedControl
          options={[DOCUMENT, PAGE, SELECTION]}
          title='Scope'
          name='scope'
          onChange={handleInput}
          value={scope}
        />
      </div>
      <div class='clean-document__checkbox'>
        <Checkbox
          disabled={scope !== DOCUMENT}
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
