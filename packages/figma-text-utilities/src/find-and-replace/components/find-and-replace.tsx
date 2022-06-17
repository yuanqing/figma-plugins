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
  FindAndReplaceProps,
  FormState,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'

export function FindAndReplace(props: FindAndReplaceProps): JSX.Element {
  const { disabled, formState, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(props, {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({
        caseSensitive,
        findString,
        useRegularExpression,
        replaceString
      }: FormState) {
        emit<SubmitHandler>('SUBMIT', {
          caseSensitive,
          findString,
          replaceString,
          useRegularExpression
        })
      },
      validate: function ({ findString }: FormState) {
        return findString !== ''
      }
    })
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (hasSelection: boolean) {
          setFormState(hasSelection, 'hasSelection')
        }
      )
    },
    [setFormState]
  )
  const {
    caseSensitive,
    findString,
    hasSelection,
    replaceString,
    useRegularExpression
  } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Find</Muted>
      </Text>
      <VerticalSpace space="small" />
      <Textbox
        {...initialFocus}
        name="findString"
        onValueInput={setFormState}
        value={findString}
        variant="border"
      />
      <VerticalSpace space="medium" />
      <Checkbox
        name="caseSensitive"
        onValueChange={setFormState}
        value={caseSensitive === true}
      >
        <Text>Match case</Text>
      </Checkbox>
      <VerticalSpace space="small" />
      <Checkbox
        name="useRegularExpression"
        onValueChange={setFormState}
        value={useRegularExpression === true}
      >
        <Text>Use regular expression</Text>
      </Checkbox>
      <VerticalSpace space="large" />
      <Text>
        <Muted>Replace</Muted>
      </Text>
      <VerticalSpace space="small" />
      <Textbox
        name="replaceString"
        onValueInput={setFormState}
        value={replaceString}
        variant="border"
      />
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Find and Replace
      </Button>
      <VerticalSpace space="small" />
      <Text align="center">
        <Muted>
          Replacing {hasSelection === true ? 'in selection' : 'on page'}
        </Muted>
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}
