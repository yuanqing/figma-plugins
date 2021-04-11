/** @jsx h */
import { LoadingIndicator, Text, VerticalSpace } from '@create-figma-plugin/ui'
import { h } from 'preact'

import style from './loading.css'

type LoadingProps = { children: preact.ComponentChildren }

export function Loading({ children }: LoadingProps): h.JSX.Element {
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
