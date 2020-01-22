/** @jsx h */
import { Divider, useForm, useMenu } from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'
import { computeAutocompleteItems } from '../utilities/compute-autocomplete-items'
import { CommandTextbox } from './command-textbox'
import { AutocompleteItem } from './autocomplete-item'
import styles from './commander.scss'

const defaultState = {
  autocompleteItems: [],
  commandString: '',
  selectedItemId: null
}

export function Commander (initialState) {
  const { state, handleChange } = useForm(
    {
      isCommandTextboxFocused: true,
      ...initialState,
      ...defaultState
    },
    {
      transform: function (state) {
        const { commandString, selectedItemId, selectedLayers } = state
        const autocompleteItems = computeAutocompleteItems(commandString, {
          selectedLayers
        })
        return {
          ...state,
          autocompleteItems,
          selectedItemId:
            selectedItemId === null
              ? autocompleteItems.length > 0
                ? autocompleteItems[0].id
                : null
              : selectedItemId
        }
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ selectedItemId }, event) {
        // Clear only if `shift` was not pressed
        const clearCommandString = event.shiftKey === false
        if (selectedItemId === null) {
          executePlugin(
            autocompleteItems.length > 0 ? autocompleteItems[0].id : null,
            clearCommandString
          )
          return
        }
        executePlugin(selectedItemId, clearCommandString)
      }
    }
  )

  const { autocompleteItems, commandString, selectedItemId } = state

  const executePlugin = useCallback(
    function (selectedItemId, clearCommandString) {
      if (selectedItemId === null) {
        return
      }
      const selectedItem = autocompleteItems.find(function ({ id }) {
        return id === selectedItemId
      })
      if (
        typeof selectedItem === 'undefined' ||
        selectedItem.isDisabled === true
      ) {
        return
      }
      const { shorthand, value } = selectedItem
      triggerEvent('EXECUTE_PLUGIN', { shorthand, value })
      if (clearCommandString === true) {
        handleChange(defaultState)
      }
    },
    [autocompleteItems, handleChange]
  )

  const handleAutocompleteItemClick = useCallback(
    function (object, value, key, event) {
      const selectedItemId = event.target.getAttribute('data-id')
      // Clear only if `shift` was not pressed
      const clearCommandString = event.shiftKey === false
      if (clearCommandString === false) {
        handleChange({ selectedItemId })
      }
      executePlugin(selectedItemId, clearCommandString)
    },
    [executePlugin, handleChange]
  )

  const handleCommandStringChange = useCallback(
    function ({ commandString }) {
      handleChange({
        commandString,
        selectedItemId: null
      })
    },
    [handleChange]
  )

  const { handleKeyDown: handleMenuKeyDown, menuElementRef } = useMenu({
    getSelectedItemElement: function (menuElement, selectedItem) {
      return menuElement.querySelector(`[data-id='${selectedItem}']`)
    },
    onChange: function (selectedItemId) {
      handleChange({ selectedItemId })
    },
    items: autocompleteItems.map(function ({ id }) {
      return id
    }),
    selectedItem: selectedItemId
  })

  useEffect(
    function () {
      window.addEventListener('keydown', handleMenuKeyDown)
      return function () {
        window.removeEventListener('keydown', handleMenuKeyDown)
      }
    },
    [handleMenuKeyDown]
  )

  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        selectedLayers
      }) {
        handleChange({ selectedLayers })
      })
    },
    [handleChange]
  )

  return (
    <label>
      <CommandTextbox
        name='commandString'
        placeholder='Enter command'
        value={commandString}
        onChange={handleCommandStringChange}
      />
      <Divider />
      <div class={styles.autocompleteItems} ref={menuElementRef}>
        {autocompleteItems.map(function (
          { id, label, value, isDisabled },
          index
        ) {
          return (
            <AutocompleteItem
              key={index}
              data-value={value}
              data-id={id}
              disabled={isDisabled === true}
              value={selectedItemId === id}
              onClick={handleAutocompleteItemClick}
            >
              {label}
            </AutocompleteItem>
          )
        })}
      </div>
    </label>
  )
}
