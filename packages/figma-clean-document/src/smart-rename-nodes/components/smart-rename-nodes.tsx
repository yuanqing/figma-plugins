import {
  Button,
  Container,
  Text,
  Textbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { CloseUIHandler, FormState, SubmitHandler } from '../utilities/types'

export function SmartRenameNodes(props: FormState): JSX.Element {
  const [loading, setLoading] = useState(false)
  const { formState, setFormState, handleSubmit, initialFocus } = useForm(
    props,
    {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({ smartRenameLayersWhitelist }: FormState) {
        setLoading(true)
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
  const { hasSelection, smartRenameLayersWhitelist } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Ignore layers named</Text>
      <VerticalSpace space="small" />
      <Textbox
        {...initialFocus}
        disabled={loading === true}
        name="smartRenameLayersWhitelist"
        onValueChange={setFormState}
        value={smartRenameLayersWhitelist}
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
      <Text align="center" muted>
        {hasSelection === true
          ? 'Renaming layers in selection'
          : 'Renaming all layers on page'}
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}
