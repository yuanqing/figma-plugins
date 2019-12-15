/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Divider,
  SelectableItem,
  Text,
  Textbox,
  VerticalSpace,
  searchIcon,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import styles from './replace-with-component.scss'

export function ReplaceWithComponent (initialState) {
  const [searchTerm, setSearchTerm] = useState('')
  const [componentId, setComponentId] = useState(null)
  const [hasSelection, setHasSelection] = useState(true)
  function submitCallback ({ shouldResizeToFitLayer }) {
    triggerEvent('SUBMIT', {
      componentId,
      shouldResizeToFitLayer
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  const { components, shouldResizeToFitLayer } = inputs
  /* eslint-disable indent */
  const filteredComponents =
    searchTerm === ''
      ? components
      : components.filter(function ({ name }) {
          return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        })
  /* eslint-enable indent */
  function handleSearchTermChange (searchTerm) {
    setSearchTerm(searchTerm)
  }
  function handleComponentClick (event) {
    const componentId = event.target.getAttribute('data-component-id')
    setComponentId(componentId)
  }
  useEffect(function () {
    addEventListener('SELECTION_CHANGED', function (hasSelection) {
      setHasSelection(hasSelection)
    })
  }, [])
  const isSubmitButtonDisabled =
    componentId === null ||
    hasSelection === false ||
    filteredComponents.findIndex(function ({ id }) {
      return id === componentId
    }) === -1
  return (
    <div>
      <Container space='medium'>
        <VerticalSpace space='extraSmall' />
        <Textbox
          icon={searchIcon}
          onChange={handleSearchTermChange}
          placeholder='Search'
          value={searchTerm}
          focused
        />
        <VerticalSpace space='extraSmall' />
      </Container>
      <div class={styles.components}>
        {filteredComponents.map(function ({ id, name }, index) {
          return (
            <SelectableItem
              key={index}
              data-component-id={id}
              selected={id === componentId}
              onClick={handleComponentClick}
            >
              {name}
            </SelectableItem>
          )
        })}
      </div>
      <Divider />
      <Container space='medium'>
        <VerticalSpace space='medium' />
        <Checkbox
          key='shouldResizeToFitLayer'
          value={shouldResizeToFitLayer === true}
          onChange={handleInput}
        >
          <Text>Resize component to fit layer</Text>
        </Checkbox>
        <VerticalSpace space='medium' />
        <Button
          fullWidth
          disabled={isSubmitButtonDisabled}
          onClick={handleSubmit}
        >
          Replace With Component
        </Button>
      </Container>
    </div>
  )
}
