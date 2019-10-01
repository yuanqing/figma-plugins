/** @jsx h */
import { triggerCommandEvent } from '@create-figma-plugin/utilities'
import { Button, render } from 'figma-ui'
import { h } from 'preact'
import { useState } from 'preact/hooks'
import languages from './languages'
import './ui.scss'

const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE'

export default render(App)

function App () {
  const [activeLanguageKey, setLanguageKey] = useState(DEFAULT_LANGUAGE)
  function handleLanguageClick (languageKey) {
    setLanguageKey(languageKey)
    triggerCommandEvent('SET_LANGUAGE', languageKey)
  }
  function handleResetClick () {
    setLanguageKey(DEFAULT_LANGUAGE)
    triggerCommandEvent('RESET_LANGUAGE')
  }
  return (
    <div>
      <div class='top'>
        {Object.keys(languages).map(function (languageKey) {
          return (
            <LanguageItem
              key={languageKey}
              isActive={activeLanguageKey === languageKey}
              onClick={handleLanguageClick.bind(null, languageKey)}
            >
              {languages[languageKey]}
            </LanguageItem>
          )
        })}
      </div>
      <div class='bottom'>
        <Button type='primary' onClick={handleResetClick}>
          Reset
        </Button>
      </div>
    </div>
  )
}

function LanguageItem ({ isActive, onClick, children }) {
  return (
    <div class={isActive ? 'item item--active' : 'item'} onClick={onClick}>
      <div class='item__text'>{children}</div>
      {isActive ? (
        <div class='item__icon'>
          <div class='icon icon--adjust icon--blue icon--resolve' />
        </div>
      ) : null}
    </div>
  )
}
