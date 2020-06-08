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
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({ apiKey }) {
      emit('SUBMIT', {
        apiKey
      })
    },
    validate: function ({ apiKey }) {
      return apiKey !== ''
    }
  })
  const { apiKey } = state
  return (
    <Container>
      <VerticalSpace space="large" />
      <Text muted>API Key</Text>
      <VerticalSpace space="small" />
      <Textbox name="apiKey" onChange={handleChange} value={apiKey} />
      <VerticalSpace space="small" />
      <Text>
        <a
          href="https://translate.yandex.com/developers/keys"
          rel="noopener noreferrer"
          target="_blank"
        >
          Get a Yandex Translate API key
        </a>
      </Text>
      <VerticalSpace space="extraLarge" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Set API Key
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
