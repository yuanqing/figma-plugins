/** @jsx h */
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { LanguageItem } from './language-item'
import { translate } from '../../translate/translate'
import languages from '../../translate/languages'
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
      triggerEvent('CLOSE')
    }
  }
  useEffect(function () {
    addEventListener('TRANSLATE_REQUEST', async function (
      layers,
      scope,
      languageKey,
      apiKey
    ) {
      const promises = layers.map(function ({ characters }) {
        return translate(characters, languageKey, apiKey)
      })
      const translated = await Promise.all(promises)
      const result = layers.map(function ({ id }, index) {
        return {
          id,
          characters: translated[index]
        }
      })
      triggerEvent('TRANSLATE_RESULT', result, scope, languageKey)
    })
  }, [])
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
