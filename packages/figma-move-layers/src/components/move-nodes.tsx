import {
  Button,
  Columns,
  Container,
  IconMoveDown16,
  IconMoveRight16,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  FormState,
  MoveNodesProps,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'

export function MoveNodes(props: MoveNodesProps): JSX.Element {
  const {
    disabled,
    handleSubmit,
    initialFocus,
    setFormState
  } = useForm<FormState>(props, {
    close: function () {
      emit<CloseUIHandler>('CLOSE_UI')
    },
    submit: function ({ horizontalOffset, verticalOffset }: FormState) {
      emit<SubmitHandler>('SUBMIT', { horizontalOffset, verticalOffset })
    },
    validate: function ({
      hasSelection,
      horizontalOffset,
      verticalOffset
    }: FormState) {
      return (
        hasSelection === true &&
        (horizontalOffset !== null || verticalOffset !== null)
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
  const [verticalOffsetString, setVerticalOffsetString] = useState(
    `${props.verticalOffset}`
  )
  const [horizontalOffsetString, setHorizontalOffsetString] = useState(
    `${props.horizontalOffset}`
  )
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <TextboxNumeric
          {...initialFocus}
          icon={<IconMoveRight16 />}
          name="horizontalOffset"
          onNumericValueInput={setFormState}
          onValueInput={setHorizontalOffsetString}
          value={horizontalOffsetString}
        />
        <TextboxNumeric
          icon={<IconMoveDown16 />}
          name="verticalOffset"
          onNumericValueInput={setFormState}
          onValueInput={setVerticalOffsetString}
          value={verticalOffsetString}
        />
      </Columns>
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Move Layers
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
