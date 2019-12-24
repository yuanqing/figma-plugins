/** @jsx h */
import {
  Container,
  Button,
  Divider,
  VerticalSpace
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  triggerEvent,
  ESCAPE_KEY_CODE
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { LanguageItem } from './language-item'
import { translate } from '../../translate/translate'
import languages from '../../translate/languages'
import styles from './language-tester.scss'

const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE'

export function LanguageTester () {
  const [activeLanguageKey, setLanguageKey] = useState(DEFAULT_LANGUAGE)
  const [isLoading, setIsLoading] = useState(false)
  function handleLanguageClick (languageKey) {
    setLanguageKey(languageKey)
    triggerEvent('SET_LANGUAGE', languageKey)
  }
  function handleResetClick () {
    setLanguageKey(DEFAULT_LANGUAGE)
    triggerEvent('RESET_LANGUAGE')
  }
  function handleKeyDown (event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      triggerEvent('CLOSE')
    }
  }
  useEffect(function () {
    return addEventListener('TRANSLATE_REQUEST', async function (
      layers,
      scope,
      languageKey,
      apiKey
    ) {
      setIsLoading(true)
      const promises = layers.map(function ({ characters }) {
        return translate(characters, languageKey, apiKey)
      })
      const translated = await Promise.all(promises)
      setIsLoading(false)
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
  const isResetButtonDisabled = activeLanguageKey === DEFAULT_LANGUAGE
  return (
    <div>
      <div class={styles.languages}>
        {Object.keys(languages).map(function (languageKey, index) {
          const isActive = activeLanguageKey === languageKey
          return (
            <LanguageItem
              key={index}
              isActive={isActive}
              isLoading={isActive === true ? isLoading : false}
              onClick={
                isActive === false
                  ? handleLanguageClick.bind(null, languageKey)
                  : null
              }
            >
              {languages[languageKey]}
            </LanguageItem>
          )
        })}
      </div>
      <Divider />
      <VerticalSpace space='small' />
      <Container space='medium'>
        <Button
          disabled={isResetButtonDisabled === true}
          fullWidth
          onClick={isResetButtonDisabled === true ? null : handleResetClick}
        >
          Reset
        </Button>
      </Container>
    </div>
  )
}
