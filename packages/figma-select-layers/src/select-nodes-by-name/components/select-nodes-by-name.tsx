import {
  Button,
  Checkbox,
  Container,
  Muted,
  Text,
  Textbox,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  SelectionChangedHandler,
  SelectNodesByNameProps,
  SubmitHandler
} from '../utilities/types.js'

export function SelectNodesByName(props: SelectNodesByNameProps): JSX.Element {
  const [layerName, setLayerName] = useState<string>(props.layerName)
  const [exactMatch, setExactMatch] = useState<boolean>(props.exactMatch)
  const [hasSelection, setHasSelection] = useState<boolean>(props.hasSelection)

  const handleSubmit = useCallback(
    function () {
      emit<SubmitHandler>('SUBMIT', {
        exactMatch,
        layerName
      })
    },
    [exactMatch, layerName]
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
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Textbox
        {...useInitialFocus()}
        onValueInput={setLayerName}
        placeholder="Layer name"
        value={layerName}
      />
      <VerticalSpace space="small" />
      <Checkbox onValueChange={setExactMatch} value={exactMatch === true}>
        <Text>Exact match</Text>
      </Checkbox>
      <VerticalSpace space="large" />
      <Button disabled={layerName === ''} fullWidth onClick={handleSubmit}>
        Select Layers by Name
      </Button>
      <VerticalSpace space="medium" />
      <Text align="center">
        <Muted>
          {hasSelection === true
            ? 'Matching layers within selection'
            : 'Matching layers on page'}
        </Muted>
      </Text>
      <VerticalSpace space="extraLarge" />
    </Container>
  )
}
