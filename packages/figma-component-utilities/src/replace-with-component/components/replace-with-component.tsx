/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Layer,
  SearchTextbox,
  Text,
  useForm,
  useScrollableMenu,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'

import { Component } from '../types'
import styles from './replace-with-component.scss'

const ITEM_ELEMENT_ATTRIBUTE_NAME = 'data-scrollable-menu-id'

export function ReplaceWithComponent(props: {
  [key: string]: any
}): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(
    {
      ...props,
      componentId: null,
      filteredComponents: props.components,
      searchTerm: ''
    },
    {
      transform: function (state) {
        const { componentId, components, searchTerm } = state
        const filteredComponents = filterNodesByName(components, searchTerm)
        return {
          ...state,
          componentId:
            filteredComponents.length === 1
              ? filteredComponents[0].id
              : componentId,
          filteredComponents
        }
      },
      validate: function ({ componentId, filteredComponents, selection }) {
        return (
          componentId !== null &&
          selection.length > 0 &&
          selection.filter(function ({ id }: { id: string }) {
            return id !== componentId
          }).length > 0 &&
          filteredComponents.findIndex(function ({ id }: { id: string }) {
            return id === componentId
          }) !== -1
        )
      },
      onSubmit: function ({ componentId, shouldResizeToFitNode }) {
        emit('SUBMIT', {
          componentId,
          shouldResizeToFitNode
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
    shouldResizeToFitNode
  } = state
  const handleLayerClick = useCallback(
    function (event: Event) {
      const componentId = (event.target as HTMLElement).getAttribute(
        ITEM_ELEMENT_ATTRIBUTE_NAME
      )
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
      return on('SELECTION_CHANGED', function ({ components, selection }) {
        handleChange({ components, selection })
      })
    },
    [handleChange]
  )
  useEffect(
    function () {
      window.addEventListener('keydown', handleKeyDown)
      return function (): void {
        window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [handleKeyDown]
  )
  return (
    <Fragment>
      <SearchTextbox
        name="searchTerm"
        onChange={handleChange}
        placeholder="Search"
        value={searchTerm}
      />
      <Divider />
      {filteredComponents.length === 0 ? (
        <div className={styles.emptyState}>
          <Text muted align="center">
            No results for “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div
          className={styles.nodes}
          ref={menuElementRef as preact.RefObject<HTMLDivElement>}
        >
          {filteredComponents.map(function (
            component: Component,
            index: number
          ) {
            const { id, name, pageName } = component
            return (
              <Layer
                key={index}
                type="component"
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
      <Container space="medium">
        <VerticalSpace space="medium" />
        <Checkbox
          name="shouldResizeToFitNode"
          value={shouldResizeToFitNode === true}
          onChange={handleChange}
        >
          <Text>Resize component to fit layer</Text>
        </Checkbox>
        <VerticalSpace space="medium" />
        <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
          Replace With Component
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function filterNodesByName(
  nodes: Array<SceneNode>,
  searchTerm: string
): Array<SceneNode> {
  if (searchTerm === '') {
    return nodes
  }
  return nodes.filter(function ({ name }) {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  })
}
