/** @jsx h */
import { h } from 'preact'
import style from './preview.scss'
import classnames from '@sindresorhus/class-names'

export function Preview ({ items }) {
  if (items === false) {
    return <div class={style.preview} />
  }
  return (
    <div class={style.preview}>
      <div class={style.inner}>
        {items === null ? (
          <div class={style.empty}>Select a text layer</div>
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
