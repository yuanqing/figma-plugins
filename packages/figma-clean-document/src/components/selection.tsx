import { Muted, Text } from '@create-figma-plugin/ui'
import { h, JSX } from 'preact'

import styles from './selection.css'

export type SelectionProps = {
  hasSelection: boolean
}

export function Selection({ hasSelection }: SelectionProps): JSX.Element {
  return (
    <div class={styles.selection}>
      <Text align="right">
        <Muted>
          {hasSelection === true
            ? 'Run on selected layers'
            : 'Run on all layers on page'}
        </Muted>
      </Text>
    </div>
  )
}
