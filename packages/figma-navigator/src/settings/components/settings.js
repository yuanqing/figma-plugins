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
  function submitCallback ({ wrapAround }) {
    triggerEvent('SUBMIT', {
      wrapAround
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
  const { wrapAround } = inputs
  return (
    <Container>
      <VerticalSpace space='extraLarge' />
      <Checkbox name='wrapAround' value={wrapAround} onChange={handleInput}>
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
