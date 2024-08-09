import {
  Button,
  Columns,
  Container,
  Muted,
  Text,
  TextboxNumeric,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  DrawSliceOverSelectionProps,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'
import styles from './draw-slice-over-selection.css'

export function DrawSliceOverSelection(
  props: DrawSliceOverSelectionProps
): JSX.Element {
  const [padding, setPadding] = useState<null | number>(props.padding)
  const [hasSelection, setHasSelection] = useState<boolean>(true)
  const handleSubmit = useCallback(
    function () {
      emit<SubmitHandler>('SUBMIT', { padding })
    },
    [padding]
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
  const [paddingString, setPaddingString] = useState(
    props.padding === null ? '' : `${props.padding}`
  )
  const disabled = hasSelection === true && padding !== null
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="large">
        <div class={styles.text}>
          <Text>
            <Muted>Padding</Muted>
          </Text>
        </div>
        <TextboxNumeric
          {...useInitialFocus()}
          minimum={0}
          name="padding"
          onNumericValueInput={setPadding}
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
