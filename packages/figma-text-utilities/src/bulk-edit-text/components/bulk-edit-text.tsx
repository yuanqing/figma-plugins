import {
  Bold,
  Container,
  MiddleAlign,
  Muted,
  Text,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  BulkEditTextProps,
  CloseUIHandler,
  SelectionChangedHandler
} from '../utilities/types.js'

export function BulkEditText(props: BulkEditTextProps): JSX.Element {
  const [identicalTextNodeCount, setIdenticalTextNodeCount] = useState(
    props.identicalTextNodeCount
  )
  useWindowKeyDown('Escape', function () {
    emit<CloseUIHandler>('CLOSE_UI')
  })
  useEffect(function () {
    return on<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      function (identicalTextNodeCount: number) {
        setIdenticalTextNodeCount(identicalTextNodeCount)
      }
    )
  }, [])
  return (
    <MiddleAlign>
      <Container space="medium">
        {identicalTextNodeCount === 0 ? (
          <Text align="center">
            <Muted>Edit a text layer</Muted>
          </Text>
        ) : identicalTextNodeCount === 1 ? (
          <Text align="center">
            <Muted>No other identical text layers</Muted>
          </Text>
        ) : (
          <Fragment>
            <Text align="center">
              <Bold>{identicalTextNodeCount} identical text layers</Bold>
            </Text>
            <VerticalSpace space="medium" />
            <Text align="center">
              <Muted>Edit then unselect this text layer to sync changes</Muted>
            </Text>
          </Fragment>
        )}
      </Container>
    </MiddleAlign>
  )
}
