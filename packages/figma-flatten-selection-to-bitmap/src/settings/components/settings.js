/** @jsx h */
import {
  Button,
  Container,
  SegmentedControl,
  Text,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'

export function Settings (initialState) {
  const { state, handleChange, handleSubmit } = useForm(initialState, {
    onSubmit: function ({ resolution }) {
      emit('SUBMIT', {
        resolution
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  const { resolution } = state
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Resolution</Text>
      <VerticalSpace space='small' />
      <SegmentedControl
        name='resolution'
        value={resolution}
        options={[
          { text: '2x', value: 2 },
          { text: '3x', value: 3 },
          { text: '4x', value: 4 }
        ]}
        onChange={handleChange}
      />
      <VerticalSpace space='large' />
      <Button fullWidth onClick={handleSubmit}>
        Save Settings
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
