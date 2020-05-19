/** @jsx h */
import classnames from '@sindresorhus/class-names'
import { Fragment, h } from 'preact'

import style from './preview.scss'

export const INVALID_SETTINGS = 'INVALID_SETTINGS'
export const NO_TEXT_LAYERS = 'NO_TEXT_LAYERS'

export function Preview({ items }) {
  if (items === INVALID_SETTINGS) {
    return <div className={style.preview} />
  }
  return (
    <div className={style.preview}>
      <div className={style.inner}>
        {items === NO_TEXT_LAYERS ? (
          <div className={style.empty}>Select one or more text layers</div>
        ) : items.length === 0 ? (
          <div className={style.empty}>No currencies in selection</div>
        ) : (
          <Fragment>
            {items.map(function ({ original, result }, index) {
              return (
                <div key={index}>
                  <div
                    className={classnames(
                      style.original,
                      original !== result ? style.strikethrough : null
                    )}
                  >
                    {original}
                  </div>
                  <div className={style.result}>{result}</div>
                </div>
              )
            })}
          </Fragment>
        )}
      </div>
    </div>
  )
}
