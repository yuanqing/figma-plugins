/** @jsx h */
import { Button, render } from 'figma-ui'
import { h } from 'preact'
import { useState } from 'preact/hooks'
import { languages } from './languages'

const DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE'

export default render(function ({ onMessage, postMessage }) {
  const [activeLanguageKey, setLanguageKey] = useState(DEFAULT_LANGUAGE)
  function handleLanguageClick (languageKey) {
    setLanguageKey(languageKey)
    postMessage({ type: 'SET_LANGUAGE', languageKey })
  }
  function handleResetClick () {
    setLanguageKey(DEFAULT_LANGUAGE)
    postMessage({ type: 'RESET_LANGUAGE' })
  }
  return (
    <div>
      <div>
        <LanguageItem
          onClick={handleResetClick}
          isActive={activeLanguageKey === DEFAULT_LANGUAGE}
        >
          Default
        </LanguageItem>
        {Object.keys(languages).map(function (languageKey) {
          return (
            <LanguageItem
              key={languageKey}
              onClick={handleLanguageClick.bind(null, languageKey)}
              isActive={activeLanguageKey === languageKey}
            >
              {languages[languageKey]}
            </LanguageItem>
          )
        })}
      </div>
      <div class='fixed right-0 bottom-0 left-0 ph2 pv2 bg-white'>
        <Button type='secondary' onClick={handleResetClick}>
          Reset
        </Button>
      </div>
    </div>
  )
})

function LanguageItem ({ onClick, isActive, children }) {
  return (
    <div class='onboarding-tip' style={{ cursor: 'pointer' }} onClick={onClick}>
      <div class='onboarding-tip__icon'>
        {isActive ? <div class='icon icon--resolve' /> : null}
      </div>
      <div class='onboarding-tip__msg'>{children}</div>
    </div>
  )
}
