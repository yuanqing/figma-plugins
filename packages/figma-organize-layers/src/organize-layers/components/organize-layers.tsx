import {
  Button,
  Checkbox,
  Columns,
  Container,
  SegmentedControl,
  spaceHorizontalIcon,
  spaceVerticalIcon,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import {
  emit,
  evaluateNumericExpression,
  on
} from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useEffect } from 'preact/hooks'

import { groupDefinitions } from '../utilities/group-definitions'
import { Preview } from './preview/preview'

export function OrganizeLayers(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({
      combineSingleLayerGroups,
      groupDefinition,
      horizontalSpace,
      verticalSpace
    }) {
      emit('SUBMIT', {
        combineSingleLayerGroups,
        groupDefinition,
        horizontalSpace: evaluateNumericExpression(horizontalSpace) || 0,
        verticalSpace: evaluateNumericExpression(verticalSpace) || 0
      })
    },
    validate: function ({ layers }) {
      return layers.length > 0
    }
  })
  useEffect(
    function () {
      return on(
        'SELECTION_CHANGED',
        function ({ layers, maximumGroupDefinition }) {
          handleChange({ layers, maximumGroupDefinition })
        }
      )
    },
    [handleChange]
  )
  const {
    combineSingleLayerGroups,
    groupDefinition,
    horizontalSpace,
    layers,
    maximumGroupDefinition,
    verticalSpace
  } = state
  return (
    <Fragment>
      <Preview
        combineSingleLayerGroups={combineSingleLayerGroups}
        groupDefinition={groupDefinition}
        layers={layers}
      />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Group by text before</Text>
        <VerticalSpace space="small" />
        <SegmentedControl
          name="groupDefinition"
          onChange={handleChange}
          options={groupDefinitions.slice(0, maximumGroupDefinition)}
          value={Math.min(groupDefinition, maximumGroupDefinition)}
        />
        <VerticalSpace space="large" />
        <Text muted>Space between layers</Text>
        <VerticalSpace space="small" />
        <Columns space="extraSmall">
          <TextboxNumeric
            icon={spaceHorizontalIcon}
            minimum={0}
            name="horizontalSpace"
            onChange={handleChange}
            value={horizontalSpace}
          />
          <TextboxNumeric
            icon={spaceVerticalIcon}
            minimum={0}
            name="verticalSpace"
            onChange={handleChange}
            value={verticalSpace}
          />
        </Columns>
        <VerticalSpace space="large" />
        <Checkbox
          name="combineSingleLayerGroups"
          onChange={handleChange}
          value={combineSingleLayerGroups}
        >
          <Text>Combine single-layer groups</Text>
        </Checkbox>
        <VerticalSpace space="large" />
        <Button
          disabled={isValid() === false}
          focused
          fullWidth
          onClick={handleSubmit}
        >
          Organize Layers
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}
