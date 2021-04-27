import classnames from '@sindresorhus/class-names'
import { Fragment, h, JSX } from 'preact'

import { PreviewItem, Status } from '../../utilities/types'
import style from './preview.css'

export function Preview(props: {
  previewItems: Array<PreviewItem>
  status: Status
}): JSX.Element {
  const { previewItems, status } = props
  if (status === 'INVALID_SETTINGS') {
    return <div className={style.preview} />
  }
  if (status === 'NO_TEXT_NODES') {
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
        {previewItems.length === 0 ? (
          <div className={style.empty}>No currencies in selection</div>
        ) : (
          <Fragment>
            {previewItems.map(function (
              { original, result }: PreviewItem,
              index
            ) {
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
