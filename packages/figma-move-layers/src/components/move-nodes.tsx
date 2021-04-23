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
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
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
  const [horizontalOffset, setHorizontalOffset] = useState(
    `${props.horizontalOffset}`
  )
  const [verticalOffset, setVerticalOffset] = useState(
    `${props.verticalOffset}`
  )
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <TextboxNumeric
          {...initialFocus}
          icon={<IconMoveRight />}
          name="horizontalOffset"
          onChange={setHorizontalOffset}
          onNumberChange={handleChange}
          value={horizontalOffset}
        />
        <TextboxNumeric
          icon={<IconMoveDown />}
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
