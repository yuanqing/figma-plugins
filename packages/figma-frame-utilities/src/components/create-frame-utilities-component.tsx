import {
  Button,
  Columns,
  Container,
  createIcon,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  FormState,
  FrameUtilitiesProps,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types'

const HorizontalPaddingIcon = createIcon(
  'M3 3v10h1V3H3zm2 10V3h1v10H5zm5-10v10h1V3h-1zm2 0v10h1V3h-1z',
  { height: 16, width: 16 }
)
const VerticalPaddingIcon = createIcon(
  'M13 3H3v1h10V3zM3 5h10v1H3V5zm10 5H3v1h10v-1zm0 2H3v1h10v-1z',
  { height: 16, width: 16 }
)

export function createFrameUtilitiesComponent(options: {
  allowNullPadding: boolean
  buttonLabel: string
}) {
  const { allowNullPadding, buttonLabel } = options
  return function (props: FrameUtilitiesProps): h.JSX.Element {
    const { disabled, handleSubmit, initialFocus, setFormState } =
      useForm<FormState>(props, {
        close: function () {
          emit<CloseUIHandler>('CLOSE_UI')
        },
        submit: function ({ horizontalPadding, verticalPadding }: FormState) {
          emit<SubmitHandler>('SUBMIT', { horizontalPadding, verticalPadding })
        },
        validate: function ({
          hasSelection,
          horizontalPadding,
          verticalPadding
        }) {
          if (allowNullPadding === true) {
            return hasSelection === true
          }
          return (
            hasSelection === true &&
            (horizontalPadding !== null || verticalPadding !== null)
          )
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
    const [horizontalPaddingString, setHorizontalPaddingString] = useState(
      props.horizontalPadding === null ? '' : `${props.horizontalPadding}`
    )
    const [verticalPaddingString, setVerticalPaddingString] = useState(
      props.verticalPadding === null ? '' : `${props.verticalPadding}`
    )
    return (
      <Container space="medium">
        <VerticalSpace space="large" />
        <Columns space="extraSmall">
          <TextboxNumeric
            {...initialFocus}
            icon={<HorizontalPaddingIcon />}
            minimum={0}
            name="horizontalPadding"
            onNumericValueInput={setFormState}
            onValueInput={setHorizontalPaddingString}
            value={horizontalPaddingString}
          />
          <TextboxNumeric
            icon={<VerticalPaddingIcon />}
            minimum={0}
            name="verticalPadding"
            onNumericValueInput={setFormState}
            onValueInput={setVerticalPaddingString}
            value={verticalPaddingString}
          />
        </Columns>
        <VerticalSpace space="large" />
        <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
          {buttonLabel}
        </Button>
        <VerticalSpace space="small" />
      </Container>
    )
  }
}
