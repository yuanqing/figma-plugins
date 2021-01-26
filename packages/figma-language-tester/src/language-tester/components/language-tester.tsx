/** @jsx h */
import {
  Button,
  Container,
  Divider,
  ESCAPE_KEY_CODE,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import languages from '../../utilities/languages.json'
import { translateAsync } from '../../utilities/translate-async'
import { LanguageItem } from './language-item'
import styles from './language-tester.scss'

const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE'

export function LanguageTester() {
  const [activeLanguageKey, setLanguageKey] = useState(DEFAULT_LANGUAGE)
  const [loading, setLoading] = useState(false)
  function handleLanguageClick(languageKey: string) {
    setLanguageKey(languageKey)
    emit('SET_LANGUAGE', { languageKey })
  }
  function handleResetClick() {
    setLanguageKey(DEFAULT_LANGUAGE)
    emit('RESET_LANGUAGE')
  }
  function handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      emit('CLOSE_UI')
    }
  }
  useEffect(function () {
    return on(
      'TRANSLATE_REQUEST',
      async function ({
        languageKey,
        layers,
        scope
      }: {
        languageKey: string
        layers: Array<{ id: string; characters: string }>
        scope: string
      }) {
        setLoading(true)
        const promises = layers.map(function ({ characters }) {
          return translateAsync(characters, languageKey)
        })
        const translated = await Promise.all(promises)
        setLoading(false)
        emit('TRANSLATE_RESULT', {
          languageKey,
          layers: layers.map(function ({ id }, index: number) {
            return {
              characters: translated[index],
              id
            }
          }),
          scope
        })
      }
    )
  }, [])
  useEffect(function () {
    window.addEventListener('keydown', handleKeyDown)
    return function () {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <Fragment>
      <div className={styles.languages}>
        {Object.keys(languages).map(function (languageKey, index) {
          const active = activeLanguageKey === languageKey
          return (
            <LanguageItem
              key={index}
              active={active}
              loading={active === true ? loading : false}
              onClick={
                active === false
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
      <VerticalSpace space="small" />
      <Container space="medium">
        <Button
          disabled={activeLanguageKey === DEFAULT_LANGUAGE}
          fullWidth
          onClick={handleResetClick}
        >
          Reset
        </Button>
      </Container>
      <VerticalSpace space="small" />
    </Fragment>
  )
}
