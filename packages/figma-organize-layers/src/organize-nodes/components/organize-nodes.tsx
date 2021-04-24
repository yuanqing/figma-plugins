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
  FormState,
  Group,
  NodeAttributes,
  OrganizeNodesProps,
  UpdateMainStateHandler,
  UpdateUIStateHandler
} from '../utilities/types'
import { OrganizeNodesPreview } from './organize-nodes-preview/organize-nodes-preview'

const groupDefinitions: Array<SegmentedControlOption<GroupDefinition>> = [
  { children: '1st /', value: 1 },
  { children: '2nd /', value: 2 },
  { children: '3rd /', value: 3 },
  { children: '4th /', value: 4 },
  { children: '5th /', value: 5 }
]

export function OrganizeNodes(props: OrganizeNodesProps): JSX.Element {
  const {
    disabled,
    formState,
    handleSubmit,
    initialFocus,
    setFormState
  } = useForm<FormState>(props, {
    close: function () {
      emit<CloseUIHandler>('CLOSE_UI')
    },
    submit: function ({
      combineSingleLayerGroups,
      groupDefinition,
      horizontalSpace,
      verticalSpace
    }: FormState) {
      emit('SUBMIT', {
        combineSingleLayerGroups,
        groupDefinition,
        horizontalSpace,
        verticalSpace
      })
    },
    validate: function ({ groups }: FormState) {
      return groups.length > 0
    }
  })
  useEffect(
    function () {
      emit<UpdateMainStateHandler>('UPDATE_MAIN_STATE', {
        combineSingleLayerGroups: formState.combineSingleLayerGroups,
        groupDefinition: formState.groupDefinition
      })
    },
    [formState.combineSingleLayerGroups, formState.groupDefinition]
  )
  useEffect(
    function () {
      return on<UpdateUIStateHandler>(
        'UPDATE_UI_STATE',
        function (
          groups: Array<Group<NodeAttributes>>,
          maximumGroupDefinition: GroupDefinition
        ) {
          setFormState(groups, 'groups')
          setFormState(maximumGroupDefinition, 'maximumGroupDefinition')
        }
      )
    },
    [setFormState]
  )
  const [horizontalSpaceString, setHorizontalSpaceString] = useState(
    `${props.horizontalSpace}`
  )
  const [verticalSpaceString, setVerticalSpaceString] = useState(
    `${props.verticalSpace}`
  )
  const {
    combineSingleLayerGroups,
    groupDefinition,
    groups,
    maximumGroupDefinition
  } = formState
  return (
    <Fragment>
      <OrganizeNodesPreview groups={groups} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Group by text before</Text>
        <VerticalSpace space="small" />
        <SegmentedControl
          name="groupDefinition"
          onValueChange={setFormState}
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
            {...initialFocus}
            icon={<IconSpaceHorizontal />}
            minimum={0}
            name="horizontalSpace"
            onNumericValueChange={setFormState}
            onValueChange={setHorizontalSpaceString}
            value={horizontalSpaceString}
          />
          <TextboxNumeric
            icon={<IconSpaceVertical />}
            minimum={0}
            name="verticalSpace"
            onNumericValueChange={setFormState}
            onValueChange={setVerticalSpaceString}
            value={verticalSpaceString}
          />
        </Columns>
        <VerticalSpace space="large" />
        <Checkbox
          name="combineSingleLayerGroups"
          onValueChange={setFormState}
          value={combineSingleLayerGroups}
        >
          <Text>Combine single-layer groups</Text>
        </Checkbox>
        <VerticalSpace space="large" />
        <Button disabled={disabled} fullWidth onClick={handleSubmit}>
          Organize Layers
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}
