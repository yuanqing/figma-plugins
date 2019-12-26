/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import {
  Button,
  Checkbox,
  Container,
  Text,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { h } from 'preact'

export function Settings (initialState) {
  const { state, handleChange, handleSubmit } = useForm(initialState, {
    onClose: function () {
      triggerEvent('CLOSE')
    },
    onSubmit: function ({ wrapAround }) {
      triggerEvent('SUBMIT', {
        wrapAround
      })
    }
  })
  const { wrapAround } = state
  return (
    <Container>
      <VerticalSpace space='extraLarge' />
      <Checkbox name='wrapAround' value={wrapAround} onChange={handleChange}>
        <Text>Loop back to the first component/frame</Text>
      </Checkbox>
      <VerticalSpace space='extraLarge' />
      <Button fullWidth onClick={handleSubmit}>
        Save Settings
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
