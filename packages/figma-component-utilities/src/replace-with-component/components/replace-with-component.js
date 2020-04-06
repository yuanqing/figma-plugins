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
  useScrollableMenu
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'
import styles from './replace-with-component.scss'

const ITEM_ELEMENT_ATTRIBUTE_NAME = 'data-scrollable-menu-id'

export function ReplaceWithComponent (initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(
    {
      ...initialState,
      componentId: null,
      filteredComponents: initialState.components,
      searchTerm: ''
    },
    {
      transform: function (state) {
        const { componentId, components, searchTerm } = state
        const filteredComponents = filterLayersByName(components, searchTerm)
        return {
          ...state,
          componentId:
            filteredComponents.length === 1
              ? filteredComponents[0].id
              : componentId,
          filteredComponents
        }
      },
      validate: function ({ componentId, filteredComponents, selectedLayers }) {
        return (
          componentId !== null &&
          selectedLayers.length > 0 &&
          selectedLayers.filter(function ({ id }) {
            return id !== componentId
          }).length > 0 &&
          filteredComponents.findIndex(function ({ id }) {
            return id === componentId
          }) !== -1
        )
      },
      onSubmit: function ({ componentId, shouldResizeToFitLayer }) {
        emit('SUBMIT', {
          componentId,
          shouldResizeToFitLayer
        })
      },
      onClose: function () {
        emit('CLOSE_UI')
      }
    }
  )
  const {
    componentId,
    filteredComponents,
    searchTerm,
    shouldResizeToFitLayer
  } = state
  const handleLayerClick = useCallback(
    function (event) {
      const componentId = event.target.getAttribute(ITEM_ELEMENT_ATTRIBUTE_NAME)
      handleChange({ componentId })
    },
    [handleChange]
  )
  const { handleKeyDown, menuElementRef } = useScrollableMenu({
    itemElementAttributeName: ITEM_ELEMENT_ATTRIBUTE_NAME,
    selectedItemId: componentId,
    onChange: function (componentId) {
      handleChange({ componentId })
    },
    changeOnMouseOver: false
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ components, selectedLayers }) {
        handleChange({ components, selectedLayers })
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
    <Fragment>
      <SearchTextbox
        name='searchTerm'
        onChange={handleChange}
        placeholder='Search'
        value={searchTerm}
      />
      <Divider />
      {filteredComponents.length === 0 ? (
        <div class={styles.emptyState}>
          <Text muted align='center'>
            No results for “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div class={styles.layers} ref={menuElementRef}>
          {filteredComponents.map(function ({ id, name, pageName }, index) {
            return (
              <Layer
                key={index}
                type='component'
                pageName={pageName}
                selected={id === componentId}
                onClick={handleLayerClick}
                {...{ [ITEM_ELEMENT_ATTRIBUTE_NAME]: id }}
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
          name='shouldResizeToFitLayer'
          value={shouldResizeToFitLayer === true}
          onChange={handleChange}
        >
          <Text>Resize component to fit layer</Text>
        </Checkbox>
        <VerticalSpace space='medium' />
        <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
          Replace With Component
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </Fragment>
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
