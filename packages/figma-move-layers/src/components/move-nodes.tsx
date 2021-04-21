import {
  Button,
  Columns,
  Container,
  IconMoveDown,
  IconMoveRight,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import type { JSX } from 'preact'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import type {
  CloseUIHandler,
  MoveNodesProps,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types'

export function MoveNodes(props: MoveNodesProps): JSX.Element {
  const { handleChange, handleSubmit, initialFocus, isValid } = useForm(props, {
    onClose: function () {
      emit<CloseUIHandler>('CLOSE_UI')
    },
    onSubmit: function ({ horizontalOffset, verticalOffset }: MoveNodesProps) {
      emit<SubmitHandler>('SUBMIT', { horizontalOffset, verticalOffset })
    },
    validate: function ({
      hasSelection,
      horizontalOffset,
      verticalOffset
    }: MoveNodesProps) {
      return (
        hasSelection === true &&
        horizontalOffset !== null &&
        verticalOffset !== null
      )
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
  const [horizontalOffset, setHorizontalOffset] = useState<null | string>(
    `${props.horizontalOffset}`
  )
  const [verticalOffset, setVerticalOffset] = useState<null | string>(
    `${props.verticalOffset}`
  )
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <TextboxNumeric
          {...initialFocus}
          icon={<IconMoveDown />}
          name="horizontalOffset"
          onChange={setHorizontalOffset}
          onNumberChange={handleChange}
          value={horizontalOffset}
        />
        <TextboxNumeric
          icon={<IconMoveRight />}
          name="verticalOffset"
          onChange={setVerticalOffset}
          onNumberChange={handleChange}
          value={verticalOffset}
        />
      </Columns>
      <VerticalSpace space="large" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Move Layers
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
