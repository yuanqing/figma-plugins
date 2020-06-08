/** @jsx h */
import {
  Button,
  Container,
  SegmentedControl,
  Text,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'

export function Settings(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit } = useForm(props, {
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({ resolution }) {
      emit('SUBMIT', {
        resolution
      })
    }
  })
  const { resolution } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Bitmap resolution</Text>
      <VerticalSpace space="small" />
      <SegmentedControl
        name="resolution"
        onChange={handleChange}
        options={[
          { text: '2x', value: 2 },
          { text: '3x', value: 3 },
          { text: '4x', value: 4 },
          { text: '8x', value: 8 },
          { text: '10x', value: 10 }
        ]}
        value={resolution}
      />
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleSubmit}>
        Save Settings
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
