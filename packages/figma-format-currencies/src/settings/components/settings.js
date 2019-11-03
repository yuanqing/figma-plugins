/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from 'figma-ui/src/components/Button'
import { Input } from 'figma-ui/src/components/Input'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { h } from 'preact'
import './settings.scss'

export function Settings ({ ...initialState }) {
  function submitCallback ({ locale }) {
    triggerEvent('SAVE_SETTINGS', { locale })
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
    <div class='settings'>
      <div class='settings__label'>Set locale…</div>
      <div class='settings__input'>
        <Input
          name='locale'
          onChange={handleInput}
          value={inputs.locale}
          focused
        />
      </div>
      <div class='settings__button'>
        <Button type='primary' onClick={handleSubmit}>
          Save Settings
        </Button>
      </div>
    </div>
  )
}
