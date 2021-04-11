/** @jsx h */
import { SelectableItem, Text } from '@create-figma-plugin/ui'
import { h } from 'preact'

import { labels } from '../utilities/labels'
import styles from './attributes.css'

export interface AttributesProps {
  attributes: { [key: string]: any }
  keysByReferenceLayerType: Array<string>
  keysBySearchTerm: Array<string>
  onAttributeClick: (_: any, newValue: string, targetKey: string) => void
}

export function Attributes({
  attributes,
  keysByReferenceLayerType,
  keysBySearchTerm,
  onAttributeClick
}: AttributesProps): h.JSX.Element {
  const result = []
  for (const key in attributes) {
    if (keysBySearchTerm.includes(key) === false) {
      continue
    }
    const object = attributes[key]
    if (typeof object === 'object') {
      // header
      const isDisabled = Object.keys(object).every(function (key) {
        return keysByReferenceLayerType.includes(key) === false
      })
      result.push(
        <SelectableItem
          key={key}
          bold
          data-id={key}
          disabled={isDisabled === true} // at least one `true`
          name={key}
          onChange={onAttributeClick}
          value={
            isDisabled === true
              ? false
              : Object.values(object).every(function (value) {
                  return value === true
                }) === true
          }
        >
          {labels[key]}
        </SelectableItem>
      )
      for (const key in object) {
        if (keysBySearchTerm.includes(key) === false) {
          continue
        }
        // item
        const isDisabled = keysByReferenceLayerType.includes(key) === false
        result.push(
          <SelectableItem
            key={key}
            data-id={key}
            disabled={isDisabled === true}
            indent
            name={key}
            onChange={onAttributeClick}
            value={isDisabled === true ? false : object[key]}
          >
            {labels[key]}
          </SelectableItem>
        )
      }
      continue
    }
    // item
    const isDisabled = keysByReferenceLayerType.includes(key) === false
    result.push(
      <SelectableItem
        key={key}
        bold
        data-id={key}
        disabled={isDisabled === true}
        name={key}
        onChange={onAttributeClick}
        value={isDisabled === true ? false : object}
      >
        {labels[key]}
      </SelectableItem>
    )
  }
  if (result.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text align="center" muted>
          No matches
        </Text>
      </div>
    )
  }
  return <div className={styles.attributes}>{result}</div>
}
