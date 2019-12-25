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
  const { inputs, handleInput, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ apiKey }) {
      return apiKey !== ''
    },
    submit: function ({ apiKey }) {
      triggerEvent('SUBMIT', {
        apiKey
      })
    },
    close: function () {
      triggerEvent('CLOSE')
    }
  })
  const { apiKey } = inputs
  return (
    <Container>
      <VerticalSpace space='large' />
      <Text muted>API Key</Text>
      <VerticalSpace space='small' />
      <Textbox name='apiKey' value={apiKey} onChange={handleInput} focused />
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
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Set API Key
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
