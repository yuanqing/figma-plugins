/** @jsx h */
import { Preview as PreviewContainer } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { groupLayers } from '../../group-layers'
import style from './preview.scss'

export function Preview ({
  layers,
  combineSingleLayerGroups,
  groupDefinition
}) {
  if (layers.length === 0) {
    return (
      <PreviewContainer>
        <div class={style.empty}>No layers on page</div>
      </PreviewContainer>
    )
  }
  const groups = groupLayers(layers, combineSingleLayerGroups, groupDefinition)
  return (
    <PreviewContainer>
      <div class={style.preview}>
        {groups.map(function ({ groupName, layers }, index) {
          return (
            <div class={style.group} key={index}>
              {layers.map(function ({ name: layerName }, index) {
                if (groupName === null) {
                  return (
                    <div class={style.item} key={index}>
                      {layerName}
                    </div>
                  )
                }
                return (
                  <div class={style.item} key={index}>
                    <strong class={style.groupName}>{groupName}</strong>
                    {layerName.substring(groupName.length)}
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
