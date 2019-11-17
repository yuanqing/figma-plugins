/** @jsx h */
import { Button } from '@create-figma-plugin/ui/src/components/button/button'
import { Container } from '@create-figma-plugin/ui/src/components/container/container'
import { Header } from '@create-figma-plugin/ui/src/components/header/header'
import { TextboxNumeric } from '@create-figma-plugin/ui/src/components/textbox/textbox-numeric/textbox-numeric'
import { useForm } from '@create-figma-plugin/ui/src/hooks/use-form'
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'

export function DrawSliceOverSelection (initialState) {
  function submitCallback ({ padding }) {
    triggerEvent('DRAW_SLICE_OVER_SELECTION', {
      padding: parseFloat(padding)
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
      <Header>Padding</Header>
      <TextboxNumeric
        name='padding'
        icon={
          <svg width='12' height='12'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M2 0H0v2h1V1h1V0zm9 2h1V0h-2v1h1v1zm-1 10v-1h1v-1h1v2h-2zM0 10v2h2v-1H1v-1H0zM4 0h4v1H4V0zm4 11H4v1h4v-1zM0 4h1v4H0V4zm12 0h-1v4h1V4z'
            />
          </svg>
        }
        onChange={handleInput}
        value={inputs.padding}
        focused
      />
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: 12 }}>
        Draw Slice Over Selection
      </Button>
    </Container>
  )
}
