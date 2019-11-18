/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import {
  Button,
  Container,
  Header,
  Text,
  Textbox,
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
    closeCallback
  )
  return (
    <Container>
      <Header>API Key</Header>
      <Textbox
        name='apiKey'
        value={inputs.apiKey}
        onChange={handleInput}
        focused
      />
      <Text style={{ marginTop: '8px' }}>
        Get a{' '}
        <a
          href='https://translate.yandex.com/developers/keys'
          target='_blank'
          rel='noopener noreferrer'
        >
          Yandex Translate API key
        </a>
      </Text>
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: '12px' }}>
        Set API Key
      </Button>
    </Container>
  )
}
