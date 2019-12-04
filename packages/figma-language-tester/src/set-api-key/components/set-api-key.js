/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import {
  Button,
  Container,
  Text,
  Textbox,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { h } from 'preact'

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
    closeCallback,
    true
  )
  return (
    <Container>
      <VerticalSpace space='large' />
      <Text muted>API Key</Text>
      <VerticalSpace space='small' />
      <Textbox
        name='apiKey'
        value={inputs.apiKey}
        onChange={handleInput}
        focused
      />
      <VerticalSpace space='small' />
      <Text>
        <a
          href='https://translate.yandex.com/developers/keys'
          target='_blank'
          rel='noopener noreferrer'
        >
          Get a Yandex Translate API key
        </a>
      </Text>
      <VerticalSpace space='extraLarge' />
      <Button fullWidth disabled={inputs.apiKey === ''} onClick={handleSubmit}>
        Set API Key
      </Button>
    </Container>
  )
}
