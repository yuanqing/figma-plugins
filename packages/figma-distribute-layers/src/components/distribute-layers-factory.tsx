import {
  Button,
  Container,
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
  DistributeLayersProps,
  FormState,
  SelectionChangedHandler,
  SubmitHandler,
  UiFactoryOptions
} from '../utilities/types.js'

export function distributeLayersFactory({ direction, icon }: UiFactoryOptions) {
  const directionLabel = `${direction[0].toUpperCase()}${direction.slice(1)}`
  return function DistributeLayers(props: DistributeLayersProps): JSX.Element {
    const { disabled, handleSubmit, initialFocus, setFormState } =
      useForm<FormState>(props, {
        close: function () {
          emit<CloseUIHandler>('CLOSE_UI')
        },
        submit: function ({ space }: FormState) {
          emit<SubmitHandler>('SUBMIT', { space })
        },
        validate: function ({ hasSelection, space }: FormState) {
          return hasSelection === true && space !== null
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
    const [spaceString, setSpaceString] = useState(
      props.space === null ? '' : `${props.space}`
    )
    return (
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Space</Text>
        <VerticalSpace space="small" />
        <TextboxNumeric
          {...initialFocus}
          icon={icon}
          name="space"
          onNumericValueInput={setFormState}
          onValueInput={setSpaceString}
          value={spaceString}
        />
        <VerticalSpace space="extraLarge" />
        <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
          Distribute Layers {directionLabel}
        </Button>
        <VerticalSpace space="small" />
      </Container>
    )
  }
}
