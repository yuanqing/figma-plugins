/** @jsx h */
import { triggerCommandEvent } from '@create-figma-plugin/utilities'
import { Button, render } from 'figma-ui'
import { h } from 'preact'
import { useState } from 'preact/hooks'
import languages from './languages'

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
      <div class='h5 overflow-auto'>
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
      <div class='ph2 pv2'>
        <Button type='secondary' onClick={handleResetClick}>
          Reset
        </Button>
      </div>
    </div>
  )
}

function LanguageItem ({ isActive, onClick, children }) {
  return (
    <div class='onboarding-tip pointer' onClick={onClick}>
      <div class='onboarding-tip__icon'>
        {isActive ? <div class='icon icon--blue icon--resolve' /> : null}
      </div>
      <div class='onboarding-tip__msg'>{children}</div>
    </div>
  )
}
