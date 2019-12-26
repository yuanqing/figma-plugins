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
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ apiKey }) {
        return apiKey !== ''
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ apiKey }) {
        triggerEvent('SUBMIT', {
          apiKey
        })
      }
    }
  )
  const { apiKey } = state
  return (
    <Container>
      <VerticalSpace space='large' />
      <Text muted>API Key</Text>
      <VerticalSpace space='small' />
      <Textbox name='apiKey' value={apiKey} onChange={handleChange} focused />
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
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Set API Key
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
