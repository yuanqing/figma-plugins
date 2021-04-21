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

import type {
  CloseUIHandler,
  DistributeLayersProps,
  SelectionChangedHandler,
  SubmitHandler,
  UiFactoryOptions
} from '../utilities/types'

export function distributeLayersFactory({ direction, icon }: UiFactoryOptions) {
  const directionLabel = `${direction[0].toUpperCase()}${direction.slice(1)}`
  return function DistributeLayers(props: DistributeLayersProps): JSX.Element {
    const { handleChange, handleSubmit, isValid } = useForm(props, {
      onClose: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      onSubmit: function ({ space }: DistributeLayersProps) {
        emit<SubmitHandler>('SUBMIT', { space })
      },
      validate: function ({ hasSelection, space }: DistributeLayersProps) {
        return hasSelection === true && space !== null
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
    const [space, setSpace] = useState<null | string>(`${props.space}`)
    return (
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Space</Text>
        <VerticalSpace space="small" />
        <TextboxNumeric
          icon={icon}
          name="space"
          onChange={setSpace}
          onNumberChange={handleChange}
          value={space}
        />
        <VerticalSpace space="extraLarge" />
        <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
          Distribute Layers {directionLabel}
        </Button>
        <VerticalSpace space="small" />
      </Container>
    )
  }
}
