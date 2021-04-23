import { Preview as PreviewContainer } from '@create-figma-plugin/ui'
import { h, JSX } from 'preact'

import { Group, NodeAttributes } from '../../utilities/types'
import style from './preview.css'

export function Preview(props: {
  groups: Array<Group<NodeAttributes>>
}): JSX.Element {
  const { groups } = props
  if (groups.length === 0) {
    return (
      <PreviewContainer>
        <div className={style.empty}>No layers on page</div>
      </PreviewContainer>
    )
  }
  return (
    <PreviewContainer>
      <div className={style.preview}>
        {groups.map(function ({ name: groupName, nodes: layers }, index) {
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
