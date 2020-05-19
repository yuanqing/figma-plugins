/** @jsx h */
import {
  Button,
  Container,
  Text,
  Textbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'

export function SetApiKey(initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ apiKey }) {
      return apiKey !== ''
    },
    onSubmit: function ({ apiKey }) {
      emit('SUBMIT', {
        apiKey
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  const { apiKey } = state
  return (
    <Container>
      <VerticalSpace space="large" />
      <Text muted>API Key</Text>
      <VerticalSpace space="small" />
      <Textbox name="apiKey" value={apiKey} onChange={handleChange} />
      <VerticalSpace space="small" />
      <Text>
        <a
          href="https://translate.yandex.com/developers/keys"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get a Yandex Translate API key
        </a>
      </Text>
      <VerticalSpace space="extraLarge" />
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Set API Key
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
