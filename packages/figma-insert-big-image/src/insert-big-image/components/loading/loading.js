/** @jsx h */
import { LoadingIndicator, Text, VerticalSpace } from '@create-figma-plugin/ui'
import { h } from 'preact'
import style from './loading.scss'

export function Loading ({ children }) {
  return (
    <div class={style.loading}>
      <LoadingIndicator />
      <VerticalSpace space='small' />
      <Text align='center' numeric>
        {children}
      </Text>
    </div>
  )
}
