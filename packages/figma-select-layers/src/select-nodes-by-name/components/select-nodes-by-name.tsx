import {
  Button,
  Checkbox,
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
  SelectNodesByNameProps,
  SubmitHandler
} from '../utilities/types.js'

export function SelectNodesByName(props: SelectNodesByNameProps): JSX.Element {
  const { disabled, formState, initialFocus, setFormState, handleSubmit } =
    useForm<FormState>(props, {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({ exactMatch, layerName }: FormState) {
        emit<SubmitHandler>('SUBMIT', {
          exactMatch,
          layerName
        })
      },
      validate: function ({ layerName }: FormState) {
        return layerName !== ''
      }
    })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function (hasSelection) {
        setFormState(hasSelection, 'hasSelection')
      })
    },
    [setFormState]
  )
  const { exactMatch, layerName, hasSelection } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Textbox
        {...initialFocus}
        name="layerName"
        onValueInput={setFormState}
        placeholder="Layer name"
        value={layerName}
        variant="border"
      />
      <VerticalSpace space="medium" />
      <Checkbox
        name="exactMatch"
        onValueChange={setFormState}
        value={exactMatch === true}
      >
        <Text>Exact match</Text>
      </Checkbox>
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Select Layers by Name
      </Button>
      <VerticalSpace space="small" />
      <Text align="center">
        <Muted>
          {hasSelection === true
            ? 'Matching layers within selection'
            : 'Matching layers on page'}
        </Muted>
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}
