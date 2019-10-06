/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { LanguageItem } from './language-item'
import languages from '../languages'
import './language-tester.scss'

const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE'

export function LanguageTester () {
  const [activeLanguageKey, setLanguageKey] = useState(DEFAULT_LANGUAGE)
  function handleLanguageClick (languageKey) {
    setLanguageKey(languageKey)
    triggerEvent('SET_LANGUAGE', languageKey)
  }
  function handleResetClick () {
    setLanguageKey(DEFAULT_LANGUAGE)
    triggerEvent('RESET_LANGUAGE')
  }
  function handleKeyDown (event) {
    if (event.key === 'Escape') {
      if (activeLanguageKey !== DEFAULT_LANGUAGE) {
        triggerEvent('RESET_LANGUAGE', true)
      } else {
        triggerEvent('CLOSE')
      }
    }
  }
  useEffect(
    function () {
      window.addEventListener('keydown', handleKeyDown)
      return function () {
        window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [activeLanguageKey]
  )
  const isResetButtonEnabled = activeLanguageKey !== DEFAULT_LANGUAGE
  return (
    <div class='language-tester'>
      <div class='language-tester__languages'>
        {Object.keys(languages).map(function (languageKey) {
          const isActive = activeLanguageKey === languageKey
          return (
            <LanguageItem
              key={languageKey}
              isActive={isActive}
              onClick={
                isActive === false &&
                handleLanguageClick.bind(null, languageKey)
              }
            >
              {languages[languageKey]}
            </LanguageItem>
          )
        })}
      </div>
      <div class='language-tester__button'>
        <Button
          type='primary'
          disabled={!isResetButtonEnabled}
          onClick={isResetButtonEnabled && handleResetClick}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
