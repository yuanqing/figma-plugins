/** @jsx h */
import { SelectableItem, Text } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { labels } from '../utilities/labels'
import styles from './attributes.scss'

export function Attributes ({
  attributes,
  keysByReferenceLayerType,
  keysBySearchTerm,
  onClick
}) {
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
          data-id={key}
          key={key}
          name={key}
          value={
            isDisabled === true
              ? false
              : Object.values(object).every(function (value) {
                  return value === true
                }) === true
          } // at least one `true`
          disabled={isDisabled === true}
          onClick={onClick}
          bold
        >
          {labels[key]}
        </SelectableItem>
      )
      for (const key in object) {
        // item
        const isDisabled = keysByReferenceLayerType.includes(key) === false
        result.push(
          <SelectableItem
            data-id={key}
            key={key}
            name={key}
            value={isDisabled === true ? false : object[key]}
            disabled={isDisabled === true}
            onClick={onClick}
            indent
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
        data-id={key}
        key={key}
        name={key}
        value={isDisabled === true ? false : object}
        disabled={isDisabled === true}
        onClick={onClick}
        bold
      >
        {labels[key]}
      </SelectableItem>
    )
  }
  if (result.length === 0) {
    return (
      <div class={styles.emptyState}>
        <Text muted align='center'>
          No matches
        </Text>
      </div>
    )
  }
  return <div class={styles.attributes}>{result}</div>
}
