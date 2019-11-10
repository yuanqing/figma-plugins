/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { useForm } from 'figma-ui/src/hooks/use-form'
import { Button } from 'figma-ui/src/components/button'
import { Input } from 'figma-ui/src/components/input'
import { h } from 'preact'
import './set-api-key.scss'

export function SetApiKey (initialState) {
  function submitCallback ({ apiKey }) {
    triggerEvent('SAVE_API_KEY', {
      apiKey
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback
  )
  return (
    <div class='set-api-key'>
      <div class='set-api-key__description'>
        Enter a{' '}
        <a
          href='https://translate.yandex.com/developers/keys'
          target='_blank'
          rel='noopener noreferrer'
        >
          Yandex Translate API key
        </a>
      </div>
      <div class='set-api-key__input'>
        <Input
          type='text'
          border
          name='apiKey'
          onChange={handleInput}
          value={inputs.apiKey}
          focused
        />
      </div>
      <div class='set-api-key__button'>
        <Button type='primary' onClick={handleSubmit}>
          Set API Key
        </Button>
      </div>
    </div>
  )
}
