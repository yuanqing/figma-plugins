import {
  Button,
  Columns,
  Container,
  Muted,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  DrawSliceOverSelectionProps,
  FormState,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'
import styles from './draw-slice-over-selection.css'

export function DrawSliceOverSelection(
  props: DrawSliceOverSelectionProps
): JSX.Element {
  const { disabled, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(props, {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({ padding }: FormState) {
        emit<SubmitHandler>('SUBMIT', { padding })
      },
      validate: function ({ hasSelection, padding }: FormState) {
        return hasSelection === true && padding !== null
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
  const [paddingString, setPaddingString] = useState(
    props.padding === null ? '' : `${props.padding}`
  )
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns>
        <div class={styles.text}>
          <Text>
            <Muted>Padding</Muted>
          </Text>
        </div>
        <TextboxNumeric
          {...initialFocus}
          minimum={0}
          name="padding"
          onNumericValueInput={setFormState}
          onValueInput={setPaddingString}
          value={paddingString}
          variant="underline"
        />
      </Columns>
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Draw Slice Over Selection
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
