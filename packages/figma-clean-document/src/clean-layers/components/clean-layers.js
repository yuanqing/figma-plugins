/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Text,
  Textbox,
  useForm
} from '@create-figma-plugin/ui'
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'

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
    <Container>
      <Checkbox
        name='deleteHiddenLayers'
        value={deleteHiddenLayers}
        onChange={handleInput}
        style={{ marginTop: '12px' }}
      >
        Delete hidden layers
      </Checkbox>
      <Checkbox
        name='ungroupSingleLayerGroups'
        value={ungroupSingleLayerGroups}
        onChange={handleInput}
      >
        Ungroup single-layer groups
      </Checkbox>
      <Checkbox name='pixelPerfect' value={pixelPerfect} onChange={handleInput}>
        Make pixel-perfect
      </Checkbox>
      <Checkbox
        name='smartRenameLayers'
        value={smartRenameLayers}
        onChange={handleInput}
      >
        Smart rename layers
        <Text muted style={{ margin: '8px 0 10px' }}>
          Ignore layers named…
        </Text>
        <Textbox
          disabled={inputs.smartRenameLayers === false}
          name='smartRenameLayersWhitelist'
          value={smartRenameLayersWhitelist}
          onChange={handleInput}
        />
      </Checkbox>
      <Checkbox
        name='smartSortLayers'
        onChange={handleInput}
        value={smartSortLayers}
      >
        Smart sort layers
        <Text muted style={{ marginTop: '8px' }}>
          Sort layers by their X and Y position while maintaining their relative
          stacking order on the page
        </Text>
      </Checkbox>
      <Button
        fullWidth
        disabled={isSubmitButtonEnabled === false}
        onClick={isSubmitButtonEnabled === true ? handleSubmit : null}
        style={{ marginTop: '8px' }}
      >
        Clean Layers
      </Button>
    </Container>
  )
}
