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
  function handleInputChange (event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }
  function handleKeydown (event) {
    if (event.key === 'Enter') {
      handleSubmitCallback(inputs)
    }
    if (event.key === 'Escape') {
      handleCancelCallback()
    }
  }
  useEffect(function () {
    window.addEventListener('keydown', handleKeydown)
    return function () {
      window.removeEventListener('keydown', handleKeydown)
    }
  })
  return {
    inputs,
    setInputs,
    handleSubmit,
    handleInputChange
  }
}
