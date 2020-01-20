/** @jsx h */
import { computeNextValue } from '@create-figma-plugin/ui/src/components/textbox/utilities/compute-next-value'
import { isKeyCodeCharacterGenerating } from '@create-figma-plugin/ui/src/components/textbox/utilities/is-keycode-character-generating'
import { ESCAPE_KEY_CODE } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useCallback, useLayoutEffect, useRef } from 'preact/hooks'
import { validateCommandString } from '../utilities/validate-command-string'
import '@create-figma-plugin/ui/src/scss/base.scss'
import styles from './command-textbox.scss'

export function CommandTextbox ({
  name,
  onChange,
  placeholder,
  value,
  ...rest
}) {
  const inputElementRef = useRef(null)

  const handleInput = useCallback(
    function () {
      onChange({ [name]: inputElementRef.current.value })
    },
    [name, onChange]
  )

  const handleKeyDown = useCallback(
    function (event) {
      const keyCode = event.keyCode
      if (keyCode === ESCAPE_KEY_CODE) {
        if (value === '') {
          inputElementRef.current.blur()
          return
        }
        onChange({ [name]: '' })
        event.stopPropagation()
        return
      }
      if (isKeyCodeCharacterGenerating(event.keyCode) === true) {
        const nextValue = computeNextValue(inputElementRef.current, event.key)
        if (validateCommandString(nextValue) === false) {
          event.preventDefault()
        }
      }
    },
    [name, onChange, value]
  )

  useLayoutEffect(function () {
    inputElementRef.current.select()
  }, [])

  return (
    <input
      {...rest}
      ref={inputElementRef}
      type='text'
      name={name}
      class={styles.input}
      placeholder={placeholder}
      value={value}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      tabIndex='0'
    />
  )
}
