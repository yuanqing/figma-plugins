import {
  Button,
  Checkbox,
  Container,
  Text,
  Textbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'

import {
  CloseUIHandler,
  FormState,
  LinkSlidesProps,
  SubmitHandler
} from '../utilities/types.js'

export function LinkSlides(props: LinkSlidesProps): JSX.Element {
  const { disabled, formState, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(props, {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function (formState: FormState) {
        emit<SubmitHandler>('SUBMIT', formState)
      },
      validate: function ({ flowName }: FormState) {
        return flowName !== ''
      }
    })
  const { flowName, shouldNumberFrameNodes } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Flow name</Text>
      <VerticalSpace space="small" />
      <Textbox name="flowName" onValueInput={setFormState} value={flowName} />
      <VerticalSpace space="medium" />
      <Checkbox
        name="shouldNumberFrameNodes"
        onValueChange={setFormState}
        value={shouldNumberFrameNodes}
      >
        <Text>Number frames</Text>
      </Checkbox>
      <VerticalSpace space="large" />
      <Button
        {...initialFocus}
        disabled={disabled === true}
        fullWidth
        onClick={handleSubmit}
      >
        Link Slides
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
