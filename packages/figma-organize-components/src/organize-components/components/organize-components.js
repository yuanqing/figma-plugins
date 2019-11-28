/** @jsx h */
import {
  Button,
  Container,
  Header,
  Textbox,
  TextboxNumeric,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Preview } from './preview/preview'

export function OrganizeComponents (initialState) {
  function submitCallback ({
    groupDefinition,
    horizontalSpace,
    verticalSpace
  }) {
    triggerEvent('ORGANIZE_COMPONENTS', {
      groupDefinition,
      horizontalSpace: castToNumber(horizontalSpace),
      verticalSpace: castToNumber(verticalSpace)
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, setInputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  useEffect(
    function () {
      addEventListener('SELECTION_CHANGED', function (layers) {
        setInputs({
          ...inputs,
          layers
        })
      })
    },
    [setInputs, inputs]
  )
  return (
    <div>
      <Preview />
      <Container>
        <Header>Group definition</Header>
        <Textbox
          name='groupDefinition'
          onChange={handleInput}
          value={inputs.groupDefinition}
        />
        <Header>Space</Header>
        <TextboxNumeric
          name='horizontalSpace'
          icon={
            <svg>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M2 3H4V13H2V14H4.5H5V13.5V2.5V2H4.5H2V3ZM12 2H12.5H15V3H13V13H15V14H12.5H12V13.5V2.5V2ZM8 11V5H9V11H8Z'
              />
            </svg>
          }
          onChange={handleInput}
          value={inputs.horizontalSpace}
        />
        <TextboxNumeric
          name='verticalSpace'
          icon={
            <svg>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M2 2V4.5V5H2.5H13.5H14V4.5V2H13V4H3V2H2ZM11 9H5V8H11V9ZM2 12H2.5H13.5H14V12.5V15H13V13H3V15H2V12.5V12Z'
              />
            </svg>
          }
          onChange={handleInput}
          value={inputs.verticalSpace}
          style={{ marginTop: '12px' }}
        />
        <Button
          fullWidth
          disabled={inputs.layers.length === 0}
          onClick={handleSubmit}
          style={{ marginTop: '24px' }}
        >
          Organize Components
        </Button>
      </Container>
    </div>
  )
}

function castToNumber (string) {
  const result = parseFloat(string)
  return isNaN(result) === true ? 0 : result
}
