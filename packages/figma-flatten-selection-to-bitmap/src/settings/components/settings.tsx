import {
  Button,
  Container,
  SegmentedControl,
  Text,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'

import {
  CloseUIHandler,
  FormState,
  SettingsProps,
  SubmitHandler
} from '../utilities/types'

export function Settings(props: SettingsProps): JSX.Element {
  const { formState, handleSubmit, setFormState } = useForm<FormState>(props, {
    close: function () {
      emit<CloseUIHandler>('CLOSE_UI')
    },
    submit: function ({ resolution }: FormState) {
      emit<SubmitHandler>('SUBMIT', {
        resolution
      })
    }
  })
  const { resolution } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Bitmap resolution</Text>
      <VerticalSpace space="small" />
      <SegmentedControl
        name="resolution"
        onValueChange={setFormState}
        options={[
          { children: '2x', value: 2 },
          { children: '3x', value: 3 },
          { children: '4x', value: 4 },
          { children: '8x', value: 8 },
          { children: '10x', value: 10 }
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
