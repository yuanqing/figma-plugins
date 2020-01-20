/** @jsx h */
import classnames from '@sindresorhus/class-names'
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import '@create-figma-plugin/ui/src/scss/base.scss'
import styles from './autocomplete-item.scss'

export function AutocompleteItem ({
  children,
  disabled: isDisabled,
  name,
  value,
  onClick,
  ...rest
}) {
  const handleChange = useCallback(
    function (event) {
      const newValue = !(value === true)
      onClick({ [name]: newValue }, newValue, name, event)
    },
    [name, onClick, value]
  )

  return (
    <label
      class={classnames(
        styles.label,
        isDisabled === true ? styles.isDisabled : null,
        value === true ? styles.isChecked : null
      )}
      tabIndex='0'
    >
      <input
        {...rest}
        class={styles.input}
        type='checkbox'
        name={name}
        checked={value === true}
        disabled={isDisabled === true}
        onChange={handleChange}
        tabIndex='-1'
      />
      <div class={styles.text}>{children}</div>
    </label>
  )
}
