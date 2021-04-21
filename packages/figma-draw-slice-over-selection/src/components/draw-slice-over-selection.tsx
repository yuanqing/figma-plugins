import {
  Button,
  Container,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import type { JSX } from 'preact'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  DrawSliceOverSelectionProps,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types'

export function DrawSliceOverSelection(
  props: DrawSliceOverSelectionProps
): JSX.Element {
  const { handleChange, handleSubmit, isValid } = useForm(props, {
    onClose: function () {
      emit<CloseUIHandler>('CLOSE_UI')
    },
    onSubmit: function ({ padding }: DrawSliceOverSelectionProps) {
      emit<SubmitHandler>('SUBMIT', { padding })
    },
    validate: function ({
      hasSelection,
      padding
    }: DrawSliceOverSelectionProps) {
      return hasSelection === true && padding !== null
    }
  })
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (hasSelection: boolean) {
          handleChange(hasSelection, 'hasSelection')
        }
      )
    },
    [handleChange]
  )
  const [padding, setPadding] = useState<null | string>(`${props.padding}`)
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Padding</Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        minimum={0}
        name="padding"
        onChange={setPadding}
        onNumberChange={handleChange}
        value={padding}
      />
      <VerticalSpace space="extraLarge" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Draw Slice Over Selection
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
