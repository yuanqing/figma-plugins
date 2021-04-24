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
  ComponentNodeAttributes,
  FormState,
  NodeAttributes,
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
        componentNodes,
        searchTerm
      }: FormState) {
        return (
          componentId !== null &&
          filterComponentNodesByName(componentNodes, searchTerm).length > 0
        )
      }
    }
  )
  const {
    componentId,
    componentNodes,
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
      event.preventDefault()
    },
    []
  )
  const {
    scrollableMenuItemIdDataAttributeName,
    menuElementRef
  } = useScrollableMenu({
    changeOnMouseOver: false,
    onChange: function (id: null | string) {
      setFormState(id, 'componentId')
    },
    selectedItemId: componentId
  })
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (options: {
          componentNodes: Array<ComponentNodeAttributes>
          selectedNodes: Array<NodeAttributes>
        }) {
          const { componentNodes, selectedNodes } = options
          setFormState(componentNodes, 'componentNodes')
          setFormState(selectedNodes, 'selectedNodes')
        }
      )
    },
    [setFormState]
  )
  const filteredComponentNodes = filterComponentNodesByName(
    componentNodes,
    searchTerm
  )
  return (
    <Fragment>
      <SearchTextbox
        {...initialFocus}
        ref={inputElementRef}
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
            component: ComponentNodeAttributes,
            index: number
          ) {
            const { id, name, pageName } = component
            return (
              <Layer
                key={index}
                onClick={handleLayerClick}
                onMouseDown={handleLayerMouseDown}
                pageName={pageName}
                selected={id === componentId}
                type="component"
                {...{ [`${COMPONENT_NODE_ID_ATTRIBUTE_NAME}`]: id }}
                {...{ [`${scrollableMenuItemIdDataAttributeName}`]: id }}
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
  nodes: Array<ComponentNodeAttributes>,
  name: string
): Array<ComponentNodeAttributes> {
  if (name === '') {
    return nodes
  }
  return nodes.filter(function (componentNode: ComponentNodeAttributes) {
    return componentNode.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
  })
}
