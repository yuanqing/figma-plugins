/** @jsx h */
import { Button } from '@create-figma-plugin/ui/src/components/button/button'
import { Container } from '@create-figma-plugin/ui/src/components/container/container'
import { TextboxNumeric } from '@create-figma-plugin/ui/src/components/textbox/textbox-numeric/textbox-numeric'
import { useForm } from '@create-figma-plugin/ui/src/hooks/use-form'
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'

export function MoveLayers (initialState) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    triggerEvent('MOVE_LAYERS', {
      horizontalOffset: parseFloat(horizontalOffset),
      verticalOffset: parseFloat(verticalOffset)
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
      <TextboxNumeric
        name='horizontalOffset'
        icon={
          <svg width='12' height='6'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M2.207 3.5l1.647 1.646-.707.708-2.5-2.5L.293 3l.354-.354 2.5-2.5.707.708L2.207 2.5h7.586L8.147.854l.707-.708 2.5 2.5.353.354-.353.354-2.5 2.5-.707-.708L9.793 3.5H2.207z'
            />
          </svg>
        }
        onChange={handleInput}
        value={inputs.horizontalOffset}
        style={{ marginTop: 12 }}
        focused
      />
      <TextboxNumeric
        name='verticalOffset'
        icon={
          <svg width='6' height='12'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M3 .292l.354.354 2.5 2.5-.707.707-1.646-1.646v7.585l1.646-1.646.707.707-2.5 2.5-.353.354-.354-.354-2.5-2.5.707-.707 1.647 1.646V2.207L.854 3.853l-.707-.707 2.5-2.5.354-.354z'
            />
          </svg>
        }
        onChange={handleInput}
        value={inputs.verticalOffset}
        style={{ marginTop: 12 }}
      />
      <Button fullWidth onClick={handleSubmit} style={{ marginTop: 12 }}>
        Move Selected Layers
      </Button>
    </Container>
  )
}
