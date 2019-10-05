/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui'
import { h } from 'preact'
import { useState } from 'preact/hooks'
import { LanguageItem } from './language-item'
import languages from '../languages'
import './app.scss'

const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE'

export function App () {
  const [activeLanguageKey, setLanguageKey] = useState(DEFAULT_LANGUAGE)
  function handleLanguageClick (languageKey) {
    setLanguageKey(languageKey)
    triggerEvent('SET_LANGUAGE', languageKey)
  }
  function handleResetClick () {
    setLanguageKey(DEFAULT_LANGUAGE)
    triggerEvent('RESET_LANGUAGE')
  }
  return (
    <div class='app'>
      <div class='app__languages'>
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
      <div class='app__button'>
        <Button type='primary' onClick={handleResetClick}>
          Reset
        </Button>
      </div>
    </div>
  )
}
