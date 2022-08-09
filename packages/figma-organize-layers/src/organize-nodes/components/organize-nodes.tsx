import {
  Button,
  Checkbox,
  Columns,
  Container,
  IconSpaceHorizontal16,
  IconSpaceVertical16,
  Muted,
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

import { GroupDefinition } from '../../utilities/types.js'
import {
  CloseUIHandler,
  FormState,
  Group,
  NodePlainObject,
  OrganizeNodesProps,
  UpdateMainStateHandler,
  UpdateUIStateHandler
} from '../utilities/types.js'
import { OrganizeNodesPreview } from './organize-nodes-preview/organize-nodes-preview.js'

const groupDefinitions: Array<SegmentedControlOption<GroupDefinition>> = [
  { children: '1st /', value: 1 },
  { children: '2nd /', value: 2 },
  { children: '3rd /', value: 3 },
  { children: '4th /', value: 4 },
  { children: '5th /', value: 5 }
]

export function OrganizeNodes(props: OrganizeNodesProps): JSX.Element {
  const { disabled, formState, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(props, {
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
          groups: Array<Group<NodePlainObject>>,
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
    props.horizontalSpace === null ? '' : `${props.horizontalSpace}`
  )
  const [verticalSpaceString, setVerticalSpaceString] = useState(
    props.verticalSpace === null ? '' : `${props.verticalSpace}`
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
        <Text>
          <Muted>Group by text before</Muted>
        </Text>
        <VerticalSpace space="small" />
        {groups.length === 0 ? (
          <SegmentedControl
            disabled
            name="groupDefinition"
            onValueChange={setFormState}
            options={groupDefinitions.slice(0, 1)}
            value={1}
          />
        ) : (
          <SegmentedControl
            name="groupDefinition"
            onValueChange={setFormState}
            options={groupDefinitions.slice(0, maximumGroupDefinition)}
            value={
              Math.min(
                groupDefinition,
                maximumGroupDefinition
              ) as GroupDefinition
            }
          />
        )}
        <VerticalSpace space="large" />
        <Text>
          <Muted>Space between layers</Muted>
        </Text>
        <VerticalSpace space="small" />
        <Columns space="extraSmall">
          <TextboxNumeric
            {...initialFocus}
            icon={<IconSpaceHorizontal16 />}
            minimum={0}
            name="horizontalSpace"
            onNumericValueInput={setFormState}
            onValueInput={setHorizontalSpaceString}
            value={horizontalSpaceString}
            variant="border"
          />
          <TextboxNumeric
            icon={<IconSpaceVertical16 />}
            minimum={0}
            name="verticalSpace"
            onNumericValueInput={setFormState}
            onValueInput={setVerticalSpaceString}
            value={verticalSpaceString}
            variant="border"
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
        <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
          Organize Layers
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}
