import classnames from '@sindresorhus/class-names'
import { Fragment, h } from 'preact'

import style from './preview.css'

export const INVALID_SETTINGS = 'INVALID_SETTINGS'
export const NO_TEXT_NODES = 'NO_TEXT_NODES'

export type PreviewProps = { items?: Array<PreviewItem>; error?: PreviewError }
export type PreviewError = 'INVALID_SETTINGS' | 'NO_TEXT_NODES'
export type PreviewItem = { original: string; result: string }

export function Preview({ items, error }: PreviewProps): h.JSX.Element {
  if (error === INVALID_SETTINGS) {
    return <div className={style.preview} />
  }
  if (error === NO_TEXT_NODES) {
    return (
      <div className={style.preview}>
        <div className={style.inner}>
          <div className={style.empty}>Select one or more text layers</div>
        </div>
      </div>
    )
  }
  return (
    <div className={style.preview}>
      <div className={style.inner}>
        {typeof items === 'undefined' || items.length === 0 ? (
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
