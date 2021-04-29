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
import { Fragment, h, JSX, RefObject } from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'

import {
  CloseUIHandler,
  ComponentNodePlainObject,
  FormState,
  NodePlainObject,
  ReplaceWithComponentProps,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types'
import styles from './replace-with-component-instance.css'

const COMPONENT_NODE_ID_ATTRIBUTE_NAME = 'data-component-node-id'

export function ReplaceWithComponentInstance(
  props: ReplaceWithComponentProps
): JSX.Element {
  const inputElementRef: RefObject<HTMLInputElement> = useRef(null)
  const {
    formState,
    setFormState,
    handleSubmit,
    disabled,
    initialFocus
  } = useForm<FormState>(
    { ...props, componentId: null, searchTerm: '' },
    {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({ componentId, shouldResizeToFitNode }: FormState) {
        if (componentId === null) {
          return
        }
        emit<SubmitHandler>('SUBMIT', {
          componentId,
          shouldResizeToFitNode
        })
      },
      validate: function ({
        componentId,
        componentNodePlainObjects,
        searchTerm
      }: FormState) {
        return (
          componentId !== null &&
          filterComponentNodesByName(componentNodePlainObjects, searchTerm)
            .length > 0
        )
      }
    }
  )
  const {
    componentId,
    componentNodePlainObjects,
    shouldResizeToFitNode,
    searchTerm
  } = formState
  const handleLayerClick: JSX.MouseEventHandler<HTMLDivElement> = useCallback(
    function (event: MouseEvent) {
      const componentId = (event.target as HTMLElement).getAttribute(
        COMPONENT_NODE_ID_ATTRIBUTE_NAME
      )
      setFormState(componentId, 'componentId')
    },
    [setFormState]
  )
  const handleLayerMouseDown: JSX.MouseEventHandler<HTMLDivElement> = useCallback(
    function (event: MouseEvent) {
      // Stop clicking from losing focus on the search textbox
      event.preventDefault()
    },
    []
  )
  const { itemIdDataAttributeName, menuElementRef } = useScrollableMenu({
    changeOnMouseOver: false,
    onItemIdChange: function (id: null | string) {
      setFormState(id, 'componentId')
    },
    selectedItemId: componentId
  })
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (options: {
          componentNodePlainObjects: Array<ComponentNodePlainObject>
          selectedNodePlainObjects: Array<NodePlainObject>
        }) {
          const {
            componentNodePlainObjects,
            selectedNodePlainObjects
          } = options
          setFormState(componentNodePlainObjects, 'componentNodePlainObjects')
          setFormState(selectedNodePlainObjects, 'selectedNodePlainObjects')
        }
      )
    },
    [setFormState]
  )
  const filteredComponentNodes = filterComponentNodesByName(
    componentNodePlainObjects,
    searchTerm
  )
  return (
    <Fragment>
      <SearchTextbox
        {...initialFocus}
        ref={inputElementRef}
        clearOnEscapeKeyDown
        name="searchTerm"
        onValueChange={setFormState}
        placeholder="Search"
        value={searchTerm}
      />
      <Divider />
      {filteredComponentNodes.length === 0 ? (
        <div className={styles.emptyState}>
          <Text align="center" muted>
            No components match “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div ref={menuElementRef} className={styles.nodes}>
          {filteredComponentNodes.map(function (
            componentNodePlainObject: ComponentNodePlainObject,
            index: number
          ) {
            const { id, name, pageName } = componentNodePlainObject
            return (
              <Layer
                key={index}
                onClick={handleLayerClick}
                onMouseDown={handleLayerMouseDown}
                pageName={pageName}
                selected={id === componentId}
                type="component"
                {...{ [`${COMPONENT_NODE_ID_ATTRIBUTE_NAME}`]: id }}
                {...{ [`${itemIdDataAttributeName}`]: id }}
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
          onValueChange={setFormState}
          value={shouldResizeToFitNode}
        >
          <Text>Resize component to fit layer</Text>
        </Checkbox>
        <VerticalSpace space="medium" />
        <Button disabled={disabled} fullWidth onClick={handleSubmit}>
          Replace With Component Instance
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function filterComponentNodesByName(
  nodes: Array<ComponentNodePlainObject>,
  name: string
): Array<ComponentNodePlainObject> {
  if (name === '') {
    return nodes
  }
  return nodes.filter(function (
    componentNodePlainObject: ComponentNodePlainObject
  ) {
    return (
      componentNodePlainObject.name
        .toLowerCase()
        .indexOf(name.toLowerCase()) !== -1
    )
  })
}
