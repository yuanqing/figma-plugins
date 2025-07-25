import {
  Button,
  Container,
  Divider,
  SearchTextbox,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { filterNodeAttributesByName } from '../utilities/filter-node-attributes-by-name.js'
import {
  CloseUIHandler,
  NodeAttributes,
  SelectionChangedHandler,
  SelectSimilarNodesProps,
  SubmitHandler
} from '../utilities/types.js'
import { NodeAttributesSelectableItems } from './node-attributes-selectable-items.js'
import styles from './select-similar-nodes.css'

export function SelectSimilarNodes(
  props: SelectSimilarNodesProps
): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [nodeAttributes, setNodeAttributes] = useState<NodeAttributes>(
    props.nodeAttributes
  )
  const [validNodeAttributeKeys, setValidNodeAttributeKeys] = useState<
    Array<keyof NodeAttributes>
  >(props.validNodeAttributeKeys)

  const filteredNodeAttributeKeys = filterNodeAttributesByName(
    nodeAttributes,
    searchTerm
  )
  const areAllValidNodeAttributesSelected = everyNodeAttributeEqualsTargetValue(
    nodeAttributes,
    validNodeAttributeKeys,
    true
  )

  const handleSubmit = useCallback(
    function () {
      emit<SubmitHandler>('SUBMIT', nodeAttributes)
    },
    [nodeAttributes]
  )
  const handleCheckAllToggleChange: JSX.GenericEventHandler<HTMLInputElement> =
    useCallback(
      function () {
        const value = !(areAllValidNodeAttributesSelected === true)
        const result: NodeAttributes = { ...nodeAttributes }
        for (const key of validNodeAttributeKeys) {
          result[key] = value
        }
        setNodeAttributes(result)
      },
      [
        areAllValidNodeAttributesSelected,
        nodeAttributes,
        validNodeAttributeKeys
      ]
    )

  useEffect(function () {
    return on<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      function (validNodeAttributeKeys: Array<keyof NodeAttributes>) {
        setValidNodeAttributeKeys(validNodeAttributeKeys)
      }
    )
  }, [])
  useWindowKeyDown('Escape', function () {
    emit<CloseUIHandler>('CLOSE_UI')
  })
  useWindowKeyDown('Enter', handleSubmit)

  const disabled =
    someNodeAttributeEqualsTargetValue(
      nodeAttributes,
      validNodeAttributeKeys,
      true
    ) === false

  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <SearchTextbox
            {...useInitialFocus()}
            clearOnEscapeKeyDown
            onValueInput={setSearchTerm}
            placeholder="Search"
            value={searchTerm}
          />
        </div>
        {searchTerm === '' ? (
          <label className={styles.checkAllToggle}>
            <input
              checked={areAllValidNodeAttributesSelected}
              onChange={handleCheckAllToggleChange}
              type="checkbox"
            />{' '}
            {areAllValidNodeAttributesSelected === true
              ? 'Uncheck all'
              : 'Check all'}
          </label>
        ) : null}
      </div>
      <Divider />
      <NodeAttributesSelectableItems
        filteredNodeAttributeKeys={filteredNodeAttributeKeys}
        handleNodeAttributesChange={setNodeAttributes}
        nodeAttributes={nodeAttributes}
        validNodeAttributeKeys={validNodeAttributeKeys}
      />
      <Divider />
      <Container space="medium">
        <VerticalSpace space="small" />
        <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
          Select Similar Layers
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function everyNodeAttributeEqualsTargetValue(
  nodeAttributes: NodeAttributes,
  keys: Array<keyof NodeAttributes>,
  targetValue: boolean
): boolean {
  for (const key of keys) {
    if (nodeAttributes[key] !== targetValue) {
      return false
    }
  }
  return true
}

function someNodeAttributeEqualsTargetValue(
  nodeAttributes: NodeAttributes,
  keys: Array<keyof NodeAttributes>,
  targetValue: boolean
): boolean {
  for (const key of keys) {
    if (nodeAttributes[key] === targetValue) {
      return true
    }
  }
  return false
}
