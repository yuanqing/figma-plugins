import {
  Button,
  Container,
  Muted,
  Text,
  Textbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

import {
  CloseUIHandler,
  FormState,
  SmartRenameNodesProps,
  SubmitHandler
} from '../utilities/types.js'

export function SmartRenameNodes(props: SmartRenameNodesProps): JSX.Element {
  const { formState, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(
      { ...props, loading: false },
      {
        close: function () {
          emit<CloseUIHandler>('CLOSE_UI')
        },
        submit: function ({ loading, smartRenameLayersWhitelist }: FormState) {
          setFormState(loading, 'loading')
          emit<SubmitHandler>('SUBMIT', smartRenameLayersWhitelist)
        }
      }
    )
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function (hasSelection: boolean) {
        setFormState(hasSelection, 'hasSelection')
      })
    },
    [setFormState]
  )
  const { hasSelection, loading, smartRenameLayersWhitelist } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Ignore layers named</Muted>
      </Text>
      <VerticalSpace space="small" />
      <Textbox
        {...initialFocus}
        disabled={loading === true}
        name="smartRenameLayersWhitelist"
        onValueInput={setFormState}
        value={smartRenameLayersWhitelist}
        variant="border"
      />
      <VerticalSpace space="extraLarge" />
      <Button
        disabled={loading === true}
        fullWidth
        loading={loading === true}
        onClick={handleSubmit}
      >
        Smart Rename Layers
      </Button>
      <VerticalSpace space="small" />
      <Text align="center">
        <Muted>
          {hasSelection === true
            ? 'Renaming layers in selection'
            : 'Renaming all layers on page'}
        </Muted>
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}
