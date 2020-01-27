/** @jsx h */
import classnames from '@sindresorhus/class-names'
import { h } from 'preact'
import style from './preview.scss'

export const INVALID_SETTINGS = 'INVALID_SETTINGS'
export const NO_TEXT_LAYERS = 'NO_TEXT_LAYERS'

export function Preview ({ items }) {
  if (items === INVALID_SETTINGS) {
    return <div class={style.preview} />
  }
  return (
    <div class={style.preview}>
      <div class={style.inner}>
        {items === NO_TEXT_LAYERS ? (
          <div class={style.empty}>Select one or more text layers</div>
        ) : items.length === 0 ? (
          <div class={style.empty}>No currencies in selection</div>
        ) : (
          <div class={style.table}>
            {items.map(function ({ original, result }, index) {
              return (
                <div key={index}>
                  <div
                    class={classnames(
                      style.original,
                      original !== result ? style.strikethrough : null
                    )}
                  >
                    {original}
                  </div>
                  <div class={style.result}>{result}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
