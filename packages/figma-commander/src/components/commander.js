/** @jsx h */
import { Divider, useForm, useMenu } from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'
import { computeAutocompleteItems } from '../utilities/compute-autocomplete-items'
import { CommandTextbox } from './command-textbox'
import styles from './commander.scss'

const defaultState = {
  autocompleteItems: [],
  commandString: '',
  selectedItemId: null
}

export function Commander (initialState) {
  const { state, handleChange } = useForm(
    {
      ...initialState,
      ...defaultState
    },
    {
      transform: function (state) {
        const { commandString, hasSelection, selectedItemId } = state
        const autocompleteItems = computeAutocompleteItems(commandString, {
          hasSelection
        })
        return {
          ...state,
          autocompleteItems,
          selectedItemId:
            autocompleteItems.length === 1 ||
            (state.autocompleteItems.length === 0 &&
              autocompleteItems.length > 0)
              ? autocompleteItems[0].id
              : selectedItemId
        }
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ selectedItemId }) {
        if (selectedItemId === null) {
          executePlugin(
            autocompleteItems.length > 0 ? autocompleteItems[0].id : null
          )
          return
        }
        executePlugin(selectedItemId)
      }
    }
  )

  const { autocompleteItems, commandString, selectedItemId } = state

  const executePlugin = useCallback(
    function (selectedItemId) {
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
      handleChange(defaultState)
    },
    [autocompleteItems, handleChange]
  )

  const handleAutocompleteItemClick = useCallback(
    function (event) {
      const selectedItemId = event.target.getAttribute('data-id')
      executePlugin(selectedItemId)
    },
    [executePlugin]
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
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )

  return (
    <div>
      <CommandTextbox
        name='commandString'
        placeholder='Enter command'
        value={commandString}
        onChange={handleChange}
      />
      <Divider />
      <div class={styles.autocompleteItems} ref={menuElementRef}>
        {autocompleteItems.map(function (
          { id, label, value, isDisabled },
          index
        ) {
          return (
            <h1
              key={index}
              data-value={value}
              data-id={id}
              onClick={isDisabled === true ? null : handleAutocompleteItemClick}
              style={{
                color: selectedItemId === id ? 'white' : 'black',
                backgroundColor: selectedItemId === id ? 'blue' : 'white',
                opacity: isDisabled === true ? '.2' : '1'
              }}
            >
              {label}
            </h1>
          )
        })}
      </div>
    </div>
  )
}
