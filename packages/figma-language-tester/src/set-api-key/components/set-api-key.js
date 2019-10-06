/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button, Input, useForm } from 'figma-ui'
import { h } from 'preact'
import './set-api-key.scss'

export function SetApiKey (initialState) {
  function submitCallback ({ apiKey }) {
    triggerEvent('SAVE_API_KEY', {
      apiKey
    })
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
    <div class='set-api-key'>
      <div class='set-api-key__description'>
        Enter a{' '}
        <a href='https://translate.yandex.com/developers/keys'>
          Yandex Translate API key
        </a>
      </div>
      <div class='set-api-key__input'>
        <Input
          type='text'
          name='apiKey'
          onChange={handleInput}
          value={inputs.apiKey}
          focused
        />
      </div>
      <div class='set-api-key__button'>
        <Button type='primary' onClick={handleSubmit}>
          Save API Key
        </Button>
      </div>
    </div>
  )
}
