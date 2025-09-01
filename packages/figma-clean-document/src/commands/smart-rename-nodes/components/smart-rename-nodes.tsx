import {
  Button,
  Container,
  Divider,
  Muted,
  Text,
  Textbox,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { Selection } from '../../../components/selection.js'
import {
  CloseUIHandler,
  SelectionChangedHandler,
  SmartRenameNodesProps,
  SubmitHandler
} from '../utilities/types.js'
import styles from './smart-rename-nodes.css'

export function SmartRenameNodes(props: SmartRenameNodesProps): JSX.Element {
  const [smartRenameLayersWhitelist, setSmartRenameLayersWhitelist] =
    useState<string>(props.smartRenameLayersWhitelist)

  const [hasSelection, setHasSelection] = useState<boolean>(props.hasSelection)
  const [loading, setLoading] = useState<boolean>(false)

  const handleCancel = useCallback(function () {
    emit<CloseUIHandler>('CLOSE_UI')
  }, [])
  const handleSubmit = useCallback(
    function () {
      setLoading(true)
      emit<SubmitHandler>('SUBMIT', smartRenameLayersWhitelist)
    },
    [smartRenameLayersWhitelist]
  )
  useEffect(function () {
    return on<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      function (hasSelection: boolean) {
        setHasSelection(hasSelection)
      }
    )
  }, [])
  useWindowKeyDown('Escape', function () {
    emit<CloseUIHandler>('CLOSE_UI')
  })
  useWindowKeyDown('Enter', handleSubmit)

  return (
    <Fragment>
      <Container space="small">
        <VerticalSpace space="large" />
        <Text>
          <Muted>Ignore layers named</Muted>
        </Text>
        <VerticalSpace space="small" />
        <Textbox
          disabled={loading === true}
          onValueInput={setSmartRenameLayersWhitelist}
          value={smartRenameLayersWhitelist}
        />
        <VerticalSpace space="large" />
      </Container>
      <Divider />
      <div class={styles.footer}>
        <Button disabled={loading === true} onClick={handleCancel} secondary>
          Cancel
        </Button>
        <Button
          {...useInitialFocus()}
          disabled={loading === true}
          fullWidth
          loading={loading === true}
          onClick={handleSubmit}
        >
          Smart rename layers
        </Button>
      </div>
      <Selection hasSelection={hasSelection} />
    </Fragment>
  )
}
