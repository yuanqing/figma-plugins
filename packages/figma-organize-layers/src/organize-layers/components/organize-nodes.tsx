import {
  Button,
  Checkbox,
  Columns,
  Container,
  IconSpaceHorizontal,
  IconSpaceVertical,
  SegmentedControl,
  SegmentedControlOption,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { GroupDefinition } from '../../utilities/types'
import {
  CloseUIHandler,
  Group,
  NodeAttributes,
  OrganizeNodesProps,
  SetPreviewSettingsHandler,
  UpdateUIStateHandler
} from '../utilities/types'
import { Preview } from './preview/preview'

const groupDefinitions: Array<SegmentedControlOption<GroupDefinition>> = [
  { children: '1st /', value: 1 },
  { children: '2nd /', value: 2 },
  { children: '3rd /', value: 3 },
  { children: '4th /', value: 4 },
  { children: '5th /', value: 5 }
]

export function OrganizeNodes(props: OrganizeNodesProps): JSX.Element {
  const { state, handleChange, handleSubmit, initialFocus, isValid } = useForm(
    props,
    {
      onClose: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      onSubmit: function ({
        combineSingleLayerGroups,
        groupDefinition,
        horizontalSpace,
        verticalSpace
      }: OrganizeNodesProps) {
        emit('SUBMIT', {
          combineSingleLayerGroups,
          groupDefinition,
          horizontalSpace,
          verticalSpace
        })
      },
      validate: function ({ groups }: OrganizeNodesProps) {
        return groups.length > 0
      }
    }
  )
  useEffect(
    function () {
      emit<SetPreviewSettingsHandler>('SET_PREVIEW_SETTINGS', {
        combineSingleLayerGroups: state.combineSingleLayerGroups,
        groupDefinition: state.groupDefinition
      })
    },
    [state.combineSingleLayerGroups, state.groupDefinition]
  )
  useEffect(
    function () {
      return on<UpdateUIStateHandler>(
        'UPDATE_UI_STATE',
        function (
          groups: Array<Group<NodeAttributes>>,
          maximumGroupDefinition: GroupDefinition
        ) {
          handleChange(groups, 'groups')
          handleChange(maximumGroupDefinition, 'maximumGroupDefinition')
        }
      )
    },
    [handleChange]
  )
  const [horizontalSpace, setHorizontalSpace] = useState(
    `${props.horizontalSpace}`
  )
  const [verticalSpace, setVerticalSpace] = useState(`${props.verticalSpace}`)
  const {
    combineSingleLayerGroups,
    groupDefinition,
    groups,
    maximumGroupDefinition
  } = state
  return (
    <Fragment>
      <Preview groups={groups} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Group by text before</Text>
        <VerticalSpace space="small" />
        <SegmentedControl
          name="groupDefinition"
          onChange={handleChange}
          options={groupDefinitions.slice(0, maximumGroupDefinition)}
          value={
            Math.min(groupDefinition, maximumGroupDefinition) as GroupDefinition
          }
        />
        <VerticalSpace space="large" />
        <Text muted>Space between layers</Text>
        <VerticalSpace space="small" />
        <Columns space="extraSmall">
          <TextboxNumeric
            icon={<IconSpaceHorizontal />}
            minimum={0}
            name="horizontalSpace"
            onChange={setHorizontalSpace}
            onNumberChange={handleChange}
            value={horizontalSpace}
          />
          <TextboxNumeric
            icon={<IconSpaceVertical />}
            minimum={0}
            name="verticalSpace"
            onChange={setVerticalSpace}
            onNumberChange={handleChange}
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
          {...initialFocus}
          disabled={isValid() === false}
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
