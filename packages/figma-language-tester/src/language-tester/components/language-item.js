/** @jsx h */
import { h } from 'preact'
import classnames from '@sindresorhus/class-names'
import styles from './language-item.scss'

export function LanguageItem ({ isActive, isLoading, onClick, children }) {
  return (
    <div
      class={classnames(
        styles.languageItem,
        isLoading === true ? styles.isLoading : null,
        isActive === true ? styles.isActive : null
      )}
      onClick={onClick}
    >
      {children}
      {isLoading === true ? (
        <svg class={styles.spinner}>
          <path d='M8 15C11.866 15 15 11.866 15 8C15 6.7865 14.6912 5.64511 14.1479 4.65013L15.0263 4.17174C15.6471 5.30882 16 6.6132 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 5.54138 1.10909 3.34181 2.85426 1.8743L3.47761 2.65678C1.96204 3.94081 1 5.85806 1 8C1 11.866 4.13401 15 8 15Z' />
        </svg>
      ) : null}
      {isLoading === false && isActive === true ? (
        <svg class={styles.icon}>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7.91107 10.8654L11.9111 6.36553L11.0889 5.63472L7.47645 9.69865L4.8889 7.11121L4.1111 7.88904L7.1111 10.8889L7.52355 11.3014L7.91107 10.8654Z'
          />
        </svg>
      ) : null}
    </div>
  )
}
