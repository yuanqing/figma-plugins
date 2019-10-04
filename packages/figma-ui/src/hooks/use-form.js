import { useEffect, useState } from 'preact/hooks'

export function useForm (
  initialInputs,
  handleSubmitCallback,
  handleCancelCallback
) {
  const [inputs, setInputs] = useState(initialInputs)
  function handleSubmit (event) {
    if (event) {
      event.preventDefault()
    }
    handleSubmitCallback(inputs)
  }
  function handleInput (event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      handleSubmitCallback(inputs)
      return
    }
    if (event.key === 'Escape') {
      handleCancelCallback()
    }
  }
  useEffect(function () {
    window.addEventListener('keydown', handleKeyDown)
    return function () {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })
  return {
    inputs,
    setInputs,
    handleSubmit,
    handleInput
  }
}
