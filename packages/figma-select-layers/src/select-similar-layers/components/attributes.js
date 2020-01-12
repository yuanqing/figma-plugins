/** @jsx h */
import { SelectableItem } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { labels } from '../utilities/labels'
import { filterAttributes } from '../utilities/filter-attributes'
import styles from './attributes.scss'

export function Attributes ({
  attributes,
  searchTerm,
  referenceLayerType,
  onClick
}) {
  const result = []
  for (const key in filterAttributes(attributes, labels, searchTerm)) {
    const value = attributes[key]
    const label = labels[key]
    const isDisabled =
      (referenceLayerType !== 'TEXT' && key === 'text') ||
      (referenceLayerType === 'TEXT' && key === 'cornerRadius')
    if (typeof value === 'object') {
      const isHeaderSelected = Object.values(value).indexOf(false) === -1
      result.push(
        <SelectableItem
          key={key}
          name={key}
          value={isDisabled === true ? false : isHeaderSelected}
          disabled={isDisabled === true}
          onClick={onClick}
          bold
        >
          {label}
        </SelectableItem>
      )
      for (const key in value) {
        result.push(
          <SelectableItem
            key={key}
            name={key}
            value={isDisabled === true ? false : value[key]}
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
    result.push(
      <SelectableItem
        key={key}
        name={key}
        value={isDisabled === true ? false : value}
        disabled={isDisabled === true}
        onClick={onClick}
        bold
      >
        {label}
      </SelectableItem>
    )
  }
  return <div class={styles.attributes}>{result}</div>
}
