/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/button'
import { Input } from 'figma-ui/src/components/input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './set-locale.scss'

export function SetLocale (initialState) {
  function submitCallback ({ locale }) {
    triggerEvent('SET_LOCALE', { locale })
  }
  function cancelCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    cancelCallback
  )
  return (
    <div class='set-locale'>
      <div class='set-locale__input'>
        <Input
          name='locale'
          onChange={handleInput}
          value={inputs.locale}
          focused
        />
      </div>
      <div class='set-locale__button'>
        <Button type='primary' onClick={handleSubmit}>
          Set Locale
        </Button>
      </div>
    </div>
  )
}
