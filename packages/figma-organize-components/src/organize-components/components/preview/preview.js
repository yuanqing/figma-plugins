/** @jsx h */
import { Preview as PreviewContainer } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { groupLayers } from '../../group-layers'
import style from './preview.scss'

export function Preview ({ layers, groupDefinition }) {
  if (layers.length === 0) {
    return (
      <PreviewContainer>
        <div class={style.empty}>No components on page</div>
      </PreviewContainer>
    )
  }
  const groups = groupLayers(layers, groupDefinition)
  return (
    <PreviewContainer>
      <div class={style.preview}>
        {Object.keys(groups).map(function (groupName, index) {
          const layers = groups[groupName]
          const length = groupName.length
          return (
            <div class={style.group} key={index}>
              {layers.map(function ({ name }, index) {
                const layerName = name.substring(length)
                return (
                  <div class={style.item} key={index}>
                    <strong class={style.groupName}>{groupName}</strong>
                    {layerName}
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
