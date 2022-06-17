import {
  createClassName,
  IconCheckCircle32,
  LoadingIndicator
} from '@create-figma-plugin/ui'
import { ComponentChildren, h, JSX } from 'preact'
import { useCallback } from 'preact/hooks'

import { LanguageKey } from '../../utilities/types.js'
import styles from './language-item.css'

export function LanguageItem(props: {
  disabled: boolean
  selected: boolean
  children: ComponentChildren
  languageKey: LanguageKey
  loading: boolean
  onClick: (languageKey: LanguageKey) => void
}) {
  const { disabled, selected, children, languageKey, loading, onClick } = props
  const handleClick: JSX.MouseEventHandler<HTMLDivElement> = useCallback(
    function () {
      if (selected === true) {
        return
      }
      onClick(languageKey)
    },
    [selected, languageKey, onClick]
  )
  return (
    <div
      className={createClassName([
        styles.languageItem,
        selected === true ? styles.selected : null,
        disabled === true ? styles.disabled : null
      ])}
      onClick={handleClick}
    >
      {children}
      <div className={styles.icon}>
        {loading === false && selected === true ? (
          <IconCheckCircle32 color="brand" />
        ) : null}
      </div>
      <div className={styles.loadingIndicator}>
        {loading === true ? <LoadingIndicator color="brand" /> : null}
      </div>
    </div>
  )
}
