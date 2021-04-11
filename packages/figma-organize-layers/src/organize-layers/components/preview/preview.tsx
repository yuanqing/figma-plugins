/** @jsx h */
import { Preview as PreviewContainer } from '@create-figma-plugin/ui'
import { h } from 'preact'

import { groupLayers } from '../../utilities/group-layers'
import style from './preview.css'

export function Preview(props: {
  combineSingleLayerGroups: boolean
  groupDefinition: number
  layers: Array<SceneNode>
}): h.JSX.Element {
  const { combineSingleLayerGroups, groupDefinition, layers } = props
  if (layers.length === 0) {
    return (
      <PreviewContainer>
        <div className={style.empty}>No layers on page</div>
      </PreviewContainer>
    )
  }
  const groups = groupLayers(layers, combineSingleLayerGroups, groupDefinition)
  return (
    <PreviewContainer>
      <div className={style.preview}>
        {groups.map(function ({ groupName, layers }, index) {
          return (
            <div key={index} className={style.group}>
              {layers.map(function ({ name }, index) {
                if (groupName === null || layers.length === 1) {
                  return <div key={index}>{name}</div>
                }
                return (
                  <div key={index}>
                    <strong className={style.groupName}>{groupName}</strong>
                    {name.substring(groupName.length)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </PreviewContainer>
  )
}
