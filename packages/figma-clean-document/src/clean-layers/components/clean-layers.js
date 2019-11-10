/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Checkbox } from 'figma-ui/src/components/checkbox'
import { Input } from 'figma-ui/src/components/input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './clean-layers.scss'

export function CleanLayers (initialState) {
  function submitCallback (settings) {
    triggerEvent('CLEAN_LAYERS', settings)
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  const {
    deleteHiddenLayers,
    pixelPerfect,
    smartRenameLayers,
    smartRenameLayersWhitelist,
    smartSortLayers,
    ungroupSingleLayerGroups
  } = inputs
  const isSubmitButtonEnabled =
    deleteHiddenLayers === true ||
    pixelPerfect === true ||
    smartRenameLayers === true ||
    smartSortLayers === true ||
    ungroupSingleLayerGroups === true
  return (
    <div class='clean-layers'>
      <div class='clean-layers__checkbox'>
        <Checkbox
          title='Delete hidden layers'
          name='deleteHiddenLayers'
          onChange={handleInput}
          value={deleteHiddenLayers}
        />
      </div>
      <div class='clean-layers__checkbox'>
        <Checkbox
          title='Ungroup single-layer groups'
          name='ungroupSingleLayerGroups'
          onChange={handleInput}
          value={ungroupSingleLayerGroups}
        />
      </div>
      <div class='clean-layers__checkbox'>
        <Checkbox
          title='Make pixel-perfect'
          name='pixelPerfect'
          onChange={handleInput}
          value={pixelPerfect}
        />
      </div>
      <div class='clean-layers__checkbox'>
        <Checkbox
          title='Smart rename layers'
          description='Ignore layers named…'
          name='smartRenameLayers'
          onChange={handleInput}
          value={smartRenameLayers}
        />
      </div>
      <div class='clean-layers__input'>
        <Input
          type='text'
          disabled={inputs.smartRenameLayers === false}
          border
          name='smartRenameLayersWhitelist'
          onChange={handleInput}
          value={smartRenameLayersWhitelist}
        />
      </div>
      <div class='clean-layers__checkbox'>
        <Checkbox
          title='Smart sort layers'
          description='Sort layers by their X and Y position while maintaining their stacking order on the page'
          name='smartSortLayers'
          onChange={handleInput}
          value={smartSortLayers}
        />
      </div>
      <div class='clean-layers__button'>
        <Button
          type='primary'
          disabled={isSubmitButtonEnabled === false}
          onClick={isSubmitButtonEnabled && handleSubmit}
        >
          Clean
        </Button>
      </div>
    </div>
  )
}
