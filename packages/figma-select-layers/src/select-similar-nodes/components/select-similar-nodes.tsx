import {
  Button,
  Container,
  Divider,
  SearchTextbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h, JSX } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'

import { filterNodeAttributesByName } from '../utilities/filter-node-attributes-by-name'
import {
  CloseUIHandler,
  FormState,
  NodeAttributes,
  SelectionChangedHandler,
  SelectSimilarNodesProps,
  SubmitHandler
} from '../utilities/types'
import { NodeAttributesSelectableItems } from './node-attributes-selectable-items'
import styles from './select-similar-nodes.css'

export function SelectSimilarNodes(
  props: SelectSimilarNodesProps
): JSX.Element {
  const {
    disabled,
    formState,
    handleSubmit,
    initialFocus,
    setFormState
  } = useForm<FormState>(
    { ...props, searchTerm: '' },
    {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({ nodeAttributes }: FormState) {
        emit<SubmitHandler>('SUBMIT', nodeAttributes)
      },
      validate: function ({
        nodeAttributes,
        validNodeAttributeKeys
      }: FormState) {
        return someNodeAttributeEqualsTargetValue(
          nodeAttributes,
          validNodeAttributeKeys,
          true
        )
      }
    }
  )
  const { nodeAttributes, validNodeAttributeKeys, searchTerm } = formState
  const filteredNodeAttributeKeys = filterNodeAttributesByName(
    nodeAttributes,
    searchTerm
  )
  const areAllValidNodeAttributesSelected = everyNodeAttributeEqualsTargetValue(
    nodeAttributes,
    validNodeAttributeKeys,
    true
  )
  const handleNodeAttributesChange = useCallback(
    function (nodeAttributes: NodeAttributes) {
      setFormState(nodeAttributes, 'nodeAttributes')
    },
    [setFormState]
  )
  const handleCheckAllToggleChange: JSX.GenericEventHandler<HTMLInputElement> = useCallback(
    function () {
      const value = !(areAllValidNodeAttributesSelected === true)
      const result: NodeAttributes = { ...nodeAttributes }
      for (const key of validNodeAttributeKeys) {
        result[key] = value
      }
      setFormState(result, 'nodeAttributes')
    },
    [
      areAllValidNodeAttributesSelected,
      nodeAttributes,
      validNodeAttributeKeys,
      setFormState
    ]
  )
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (validNodeAttributeNames: Array<keyof NodeAttributes>) {
          setFormState(validNodeAttributeNames, 'validNodeAttributeKeys')
        }
      )
    },
    [setFormState]
  )
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <SearchTextbox
            {...initialFocus}
            clearOnEscapeKeyDown
            name="searchTerm"
            onValueChange={setFormState}
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
        handleNodeAttributesChange={handleNodeAttributesChange}
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
