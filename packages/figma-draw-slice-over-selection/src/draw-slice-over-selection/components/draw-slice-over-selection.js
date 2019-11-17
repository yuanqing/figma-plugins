/** @jsx h */
import { triggerEvent } from '@create-figma-plugin/utilities'
import { Button } from '@create-figma-plugin/ui/src/components/button/button'
import { Container } from '@create-figma-plugin/ui/src/components/container/container'
import { Header } from '@create-figma-plugin/ui/src/components/header/header'
import { TextboxNumeric } from '@create-figma-plugin/ui/src/components/textbox/textbox-numeric/textbox-numeric'
import { useForm } from '@create-figma-plugin/ui/src/hooks/use-form'
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
          <svg width='10' height='10'>
            <path d='M7 0H3v1h4V0zM1 1V0H0v1h1zM0 3h1v4H0V3zm9 0h1v4H9V3zm1-2H9V0h1v1zM3 9h4v1H3V9zM1 9H0v1h1V9zm8 1V9h1v1H9z' />
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
