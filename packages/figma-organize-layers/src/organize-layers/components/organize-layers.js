/** @jsx h */
import {
  Button,
  Checkbox,
  Columns,
  Container,
  SegmentedControl,
  Text,
  TextboxNumeric,
  VerticalSpace,
  spaceHorizontalIcon,
  spaceVerticalIcon,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  evaluateNumericExpression,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Preview } from './preview/preview'
import { groupDefinitions } from '../utilities/group-definitions'

export function OrganizeLayers (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ layers }) {
        return layers.length > 0
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({
        combineSingleLayerGroups,
        groupDefinition,
        horizontalSpace,
        verticalSpace
      }) {
        triggerEvent('SUBMIT', {
          combineSingleLayerGroups,
          groupDefinition,
          horizontalSpace: evaluateNumericExpression(horizontalSpace) || 0,
          verticalSpace: evaluateNumericExpression(verticalSpace) || 0
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        layers,
        maximumGroupDefinition
      }) {
        handleChange({ layers, maximumGroupDefinition })
      })
    },
    [handleChange]
  )
  const {
    combineSingleLayerGroups,
    groupDefinition,
    horizontalSpace,
    maximumGroupDefinition,
    verticalSpace
  } = state
  return (
    <Fragment>
      <Preview {...state} />
      <Container space='medium'>
        <VerticalSpace space='large' />
        <Text muted>Group by text before</Text>
        <VerticalSpace space='small' />
        <SegmentedControl
          name='groupDefinition'
          value={Math.min(groupDefinition, maximumGroupDefinition)}
          options={groupDefinitions.slice(0, maximumGroupDefinition)}
          onChange={handleChange}
        />
        <VerticalSpace space='large' />
        <Text muted>Space between layers</Text>
        <VerticalSpace space='small' />
        <Columns space='extraSmall'>
          <TextboxNumeric
            name='horizontalSpace'
            icon={spaceHorizontalIcon}
            value={horizontalSpace}
            minimum={0}
            onChange={handleChange}
          />
          <TextboxNumeric
            name='verticalSpace'
            icon={spaceVerticalIcon}
            value={verticalSpace}
            minimum={0}
            onChange={handleChange}
          />
        </Columns>
        <VerticalSpace space='large' />
        <Checkbox
          name='combineSingleLayerGroups'
          onChange={handleChange}
          value={combineSingleLayerGroups}
        >
          <Text>Combine single-layer groups</Text>
        </Checkbox>
        <VerticalSpace space='large' />
        <Button
          fullWidth
          disabled={isInvalid() === true}
          focused
          onClick={handleSubmit}
        >
          Organize Layers
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </Fragment>
  )
}
