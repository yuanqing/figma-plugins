import {
  Button,
  Checkbox,
  Container,
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
        useRegularExpression: regularExpression,
        replaceString
      }: FormState) {
        emit<SubmitHandler>('SUBMIT', {
          caseSensitive,
          findString,
          replaceString,
          useRegularExpression: regularExpression
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
      <Text muted>Find</Text>
      <VerticalSpace space="small" />
      <Textbox
        {...initialFocus}
        name="findString"
        onValueInput={setFormState}
        value={findString}
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
      <Text muted>Replace</Text>
      <VerticalSpace space="small" />
      <Textbox
        name="replaceString"
        onValueInput={setFormState}
        value={replaceString}
      />
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Find and Replace
      </Button>
      <VerticalSpace space="small" />
      <Text align="center" muted>
        Replacing {hasSelection === true ? 'in selection' : 'on page'}
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}
