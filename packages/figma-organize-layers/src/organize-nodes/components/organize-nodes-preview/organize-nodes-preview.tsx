import { Preview } from '@create-figma-plugin/ui'
import { h, JSX } from 'preact'

import { Group, NodePlainObject } from '../../utilities/types'
import styles from './organize-nodes-preview.css'

export function OrganizeNodesPreview(props: {
  groups: Array<Group<NodePlainObject>>
}): JSX.Element {
  const { groups } = props
  if (groups.length === 0) {
    return (
      <Preview>
        <div className={styles.empty}>No layers on page</div>
      </Preview>
    )
  }
  return (
    <Preview>
      <div className={styles.preview}>
        {groups.map(function ({ name: groupName, nodes }, index) {
          return (
            <div key={index} className={styles.group}>
              {nodes.map(function ({ name }, index) {
                if (groupName === null || nodes.length === 1) {
                  return <div key={index}>{name}</div>
                }
                return (
                  <div key={index}>
                    <strong className={styles.groupName}>{groupName}</strong>
                    {name.substring(groupName.length)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </Preview>
  )
}
