import { SelectableItem, Text } from '@create-figma-plugin/ui'
import { ComponentChildren, h, JSX } from 'preact'
import { useCallback } from 'preact/hooks'

import { categoryLabels, labels } from '../utilities/labels.js'
import { normalizeNodeAttributes } from '../utilities/normalize-node-attributes.js'
import {
  NodeAttributes,
  NormalizedNodeAttributeItem
} from '../utilities/types.js'
import styles from './node-attributes-selectable-items.css'

export function NodeAttributesSelectableItems(props: {
  filteredNodeAttributeKeys: Array<keyof NodeAttributes>
  handleNodeAttributesChange: (nodeAttributes: NodeAttributes) => void
  nodeAttributes: NodeAttributes
  validNodeAttributeKeys: Array<keyof NodeAttributes>
}): JSX.Element {
  const {
    filteredNodeAttributeKeys,
    handleNodeAttributesChange,
    nodeAttributes,
    validNodeAttributeKeys
  } = props
  const children: Array<ComponentChildren> = []
  const normalizedNodeAttributes = normalizeNodeAttributes(
    nodeAttributes,
    validNodeAttributeKeys
  )
  const onValueChange = useCallback(
    function (newValue: boolean, name: undefined | string) {
      if (typeof name === 'undefined') {
        throw new Error(`\`name\` is \`undefined\``)
      }
      const result: NodeAttributes = { ...nodeAttributes }
      for (const {
        categoryKey,
        nodeAttributeKey,
        value
      } of normalizedNodeAttributes) {
        if (nodeAttributeKey === name || categoryKey === name) {
          result[nodeAttributeKey] = newValue
        } else {
          result[nodeAttributeKey] = value
        }
      }
      handleNodeAttributesChange(result)
    },
    [handleNodeAttributesChange, nodeAttributes, normalizedNodeAttributes]
  )
  const categoriesAlreadyAdded: Record<string, true> = {}
  for (const {
    categoryKey,
    disabled,
    nodeAttributeKey,
    value
  } of normalizedNodeAttributes) {
    if (filteredNodeAttributeKeys.includes(nodeAttributeKey) === false) {
      continue
    }
    if (categoryKey === null) {
      // Item
      children.push(
        <SelectableItem
          key={nodeAttributeKey}
          bold
          disabled={disabled === true}
          name={`${nodeAttributeKey}`}
          onValueChange={onValueChange}
          value={value}
        >
          {labels[nodeAttributeKey]}
        </SelectableItem>
      )
      continue
    }
    if (categoriesAlreadyAdded[categoryKey] !== true) {
      categoriesAlreadyAdded[categoryKey] = true
      const itemsInSameCategory = normalizedNodeAttributes.filter(function (
        item: NormalizedNodeAttributeItem
      ) {
        return item.categoryKey === categoryKey
      })
      const categoryDisabled = itemsInSameCategory.every(function (
        item: NormalizedNodeAttributeItem
      ) {
        return item.disabled === true
      })
      const categoryValue =
        categoryDisabled === true
          ? false
          : itemsInSameCategory.every(function (
              item: NormalizedNodeAttributeItem
            ) {
              return item.value === true
            })
      // Category
      const label = categoryLabels[categoryKey]
      if (typeof label === 'undefined') {
        throw new Error(`No label for category \`${categoryKey}\``)
      }
      children.push(
        <SelectableItem
          key={categoryKey}
          bold
          disabled={categoryDisabled}
          name={categoryKey}
          onValueChange={onValueChange}
          value={categoryValue}
        >
          {label}
        </SelectableItem>
      )
    }
    // Indented item
    children.push(
      <SelectableItem
        key={nodeAttributeKey}
        disabled={disabled === true}
        indent
        name={`${nodeAttributeKey}`}
        onValueChange={onValueChange}
        value={value}
      >
        {labels[nodeAttributeKey]}
      </SelectableItem>
    )
  }
  if (children.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text align="center" muted>
          No matches
        </Text>
      </div>
    )
  }
  return <div className={styles.attributes}>{children}</div>
}
