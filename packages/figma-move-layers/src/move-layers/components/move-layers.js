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
          <svg>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M3 8.5V12H4L4 8.5H11.7929L9.64645 10.6464L10.3536 11.3536L13.3536 8.35355L13.7071 8L13.3536 7.64645L10.3536 4.64645L9.64645 5.35355L11.7929 7.5H4L4 4H3V7.5V8.5Z'
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
          <svg>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M7.5 3H4V4L7.5 4L7.5 11.7929L5.35355 9.64645L4.64645 10.3536L7.64645 13.3536L8 13.7071L8.35355 13.3536L11.3536 10.3536L10.6464 9.64645L8.5 11.7929L8.5 4L12 4V3H8.5H7.5Z'
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
