import { LoadingIndicator, Text, VerticalSpace } from '@create-figma-plugin/ui'
import { ComponentChildren, h } from 'preact'

import style from './loading.css'

export function Loading(props: { children: ComponentChildren }): h.JSX.Element {
  const { children } = props
  return (
    <div className={style.loading}>
      <LoadingIndicator />
      <VerticalSpace space="small" />
      <Text align="center" numeric>
        {children}
      </Text>
    </div>
  )
}
