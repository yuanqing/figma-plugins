/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Layer,
  SearchTextbox,
  Text,
  VerticalSpace,
  useForm,
  useMenu
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import styles from './jump-to-layer.scss'

export function JumpToLayer (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    {
      ...initialState,
      filteredLayers:
        initialState.searchCurrentPageOnly === true
          ? filterLayersByPageId(
              initialState.layers,
              initialState.currentPageId
            )
          : initialState.layers,
      searchTerm: ''
    },
    {
      transform: function (state) {
        const {
          currentPageId,
          layers,
          searchCurrentPageOnly,
          searchTerm,
          selectedLayerId
        } = state
        const filteredLayers = filterLayersByName(
          searchCurrentPageOnly === true
            ? filterLayersByPageId(layers, currentPageId)
            : layers,
          searchTerm
        )
        return {
          ...state,
          filteredLayers,
          selectedLayerId:
            filteredLayers.length === 1 ? filteredLayers[0].id : selectedLayerId
        }
      },
      validate: function ({ filteredLayers, selectedLayerId }) {
        return (
          selectedLayerId !== null &&
          filteredLayers.findIndex(function ({ id }) {
            return id === selectedLayerId
          }) !== -1
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ selectedLayerId }) {
        if (selectedLayerId === null) {
          return
        }
        triggerEvent('SUBMIT', {
          selectedLayerId
        })
      }
    }
  )
  const {
    filteredLayers,
    searchCurrentPageOnly,
    searchTerm,
    selectedLayerId
  } = state
  function handleLayerClick (event) {
    const selectedLayerId = event.target.getAttribute('data-id')
    handleChange({ selectedLayerId })
  }
  const { handleKeyDown, menuElementRef } = useMenu({
    getSelectedItemElement: function (menuElement, selectedItem) {
      return menuElement.querySelector(`[data-id='${selectedItem}']`)
    },
    onChange: function (selectedLayerId) {
      handleChange({ selectedLayerId })
    },
    items: filteredLayers.map(function ({ id }) {
      return id
    }),
    selectedItem: selectedLayerId
  })
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        currentPageId,
        layers
      }) {
        handleChange({ currentPageId, layers })
      })
    },
    [handleChange]
  )
  useEffect(
    function () {
      window.addEventListener('keydown', handleKeyDown)
      return function () {
        window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [handleKeyDown]
  )
  return (
    <div>
      <SearchTextbox
        name='searchTerm'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        propagateEscapeKeyDown
        placeholder='Search'
        value={searchTerm}
        focused
      />
      <Divider />
      {filteredLayers.length === 0 ? (
        <div class={styles.emptyState}>
          <Text muted align='center'>
            No results for “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div class={styles.layers} ref={menuElementRef}>
          {filteredLayers.map(function ({ id, name, pageName, type }, index) {
            return (
              <Layer
                key={index}
                pageName={pageName}
                type={type.toLowerCase()}
                data-id={id}
                selected={id === selectedLayerId}
                onClick={handleLayerClick}
              >
                {name}
              </Layer>
            )
          })}
        </div>
      )}
      <Divider />
      <Container space='medium'>
        <VerticalSpace space='medium' />
        <Checkbox
          name='searchCurrentPageOnly'
          value={searchCurrentPageOnly}
          onChange={handleChange}
        >
          <Text>Search current page only</Text>
        </Checkbox>
        <VerticalSpace space='medium' />
        <Button
          fullWidth
          disabled={isInvalid() === true}
          onClick={handleSubmit}
        >
          Jump to Component/Frame
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </div>
  )
}

function filterLayersByName (layers, searchTerm) {
  if (searchTerm === '') {
    return layers
  }
  return layers.filter(function ({ name }) {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  })
}

function filterLayersByPageId (layers, currentPageId) {
  if (currentPageId === null) {
    return layers
  }
  return layers.filter(function ({ pageId }) {
    return pageId === currentPageId
  })
}
