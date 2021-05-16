import {
  Button,
  Container,
  Divider,
  useWindowKeyDownHandler,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { languages } from '../../utilities/languages.js'
import { translateAsync } from '../../utilities/translate-async.js'
import {
  LanguageKey,
  TextNodePlainObject,
  TranslateRequestHandler,
  TranslateResultHandler
} from '../../utilities/types.js'
import {
  CloseUIHandler,
  ResetLanguageHandler,
  SelectionChangedHandler,
  SetLanguageHandler
} from '../utilities/types.js'
import { LanguageItem } from './language-item.js'
import styles from './language-tester.css'

export function LanguageTester() {
  const [
    selectedLanguageKey,
    setSelectedLanguageKey
  ] = useState<null | LanguageKey>(null)
  const [hasSelection, setHasSelection] = useState(true)
  const [loading, setLoading] = useState(false)
  const handleLanguageItemClick = useCallback(
    function (languageKey: LanguageKey) {
      setSelectedLanguageKey(languageKey)
      emit<SetLanguageHandler>('SET_LANGUAGE', languageKey)
    },
    [setSelectedLanguageKey]
  )
  const handleResetButtonClick = useCallback(
    function () {
      setSelectedLanguageKey(null)
      emit<ResetLanguageHandler>('RESET_LANGUAGE')
    },
    [setSelectedLanguageKey]
  )
  useWindowKeyDownHandler('Escape', function () {
    emit<CloseUIHandler>('CLOSE_UI')
  })
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (hasSelection: boolean) {
          setHasSelection(hasSelection)
        }
      )
    },
    [setHasSelection]
  )
  useEffect(
    function () {
      return on<TranslateRequestHandler>(
        'TRANSLATE_REQUEST',
        async function (
          textNodePlainObjects: Array<TextNodePlainObject>,
          languageKey: LanguageKey
        ) {
          setLoading(true)
          const promises = textNodePlainObjects.map(function (
            textNodePlainObject: TextNodePlainObject
          ) {
            return translateAsync(textNodePlainObject, languageKey)
          })
          const result = await Promise.all(promises)
          setLoading(false)
          emit<TranslateResultHandler>('TRANSLATE_RESULT', result, languageKey)
        }
      )
    },
    [setLoading]
  )
  return (
    <Fragment>
      <div className={styles.languages}>
        {(Object.keys(languages) as Array<LanguageKey>).map(function (
          languageKey: LanguageKey,
          index: number
        ) {
          const selected = selectedLanguageKey === languageKey
          return (
            <LanguageItem
              key={index}
              disabled={hasSelection === false}
              languageKey={languageKey}
              loading={selected === true && loading === true}
              onClick={handleLanguageItemClick}
              selected={selected}
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
          disabled={selectedLanguageKey === null}
          fullWidth
          onClick={handleResetButtonClick}
        >
          Reset
        </Button>
      </Container>
      <VerticalSpace space="small" />
    </Fragment>
  )
}
