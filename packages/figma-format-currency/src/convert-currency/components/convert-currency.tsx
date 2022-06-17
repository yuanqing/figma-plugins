import {
  Button,
  Checkbox,
  Container,
  Muted,
  Text,
  TextboxAutocomplete,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Preview } from '../../components/preview/preview.js'
import { convertCurrency } from '../../utilities/convert-currency/convert-currency.js'
import { currencies } from '../../utilities/data/currencies.js'
import { locales } from '../../utilities/data/locales.js'
import { moneyRegex } from '../../utilities/money-regex.js'
import {
  CurrencyCode,
  LocaleCode,
  PreviewItem,
  Status,
  TextNodePlainObject
} from '../../utilities/types.js'
import {
  CloseUIHandler,
  ConvertCurrencyProps,
  FormState,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'

const currencyCodeOptions = Object.keys(currencies).map(function (
  currencyCode: string
) {
  return { value: currencyCode }
})
const localeCodeOptions = Object.keys(locales).map(function (
  localeCode: string
) {
  return { value: localeCode }
})

export function ConvertCurrency(props: ConvertCurrencyProps): JSX.Element {
  const { disabled, formState, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(
      { ...props, previewItems: [], status: 'OK' },
      {
        close: function () {
          emit<CloseUIHandler>('CLOSE_UI')
        },
        submit: function ({
          currencyCode,
          roundNumbers,
          localeCode,
          textNodePlainObjects
        }: FormState) {
          if (currencyCode === null) {
            throw new Error('`currencyCode` is `null`')
          }
          if (localeCode === null) {
            throw new Error('`localeCode` is `null`')
          }
          const options = {
            currencyCode,
            localeCode,
            roundNumbers
          }
          const result: Array<TextNodePlainObject> = []
          for (const { id, characters } of textNodePlainObjects) {
            result.push({
              characters: convertCurrency(characters, options),
              id
            })
          }
          emit<SubmitHandler>('SUBMIT', result, options)
        },
        transform: function (formState: FormState): FormState {
          const {
            textNodePlainObjects,
            currencyCode,
            localeCode,
            roundNumbers
          } = formState
          const { previewItems, status } = computePreview(
            textNodePlainObjects,
            {
              currencyCode,
              localeCode,
              roundNumbers
            }
          )
          return { ...formState, previewItems, status }
        },
        validate: function ({ previewItems, status }: FormState) {
          return status === 'OK' && previewItems.length > 0
        }
      }
    )
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (textNodePlainObjects: Array<TextNodePlainObject>) {
          setFormState(textNodePlainObjects, 'textNodePlainObjects')
        }
      )
    },
    [setFormState]
  )
  const { localeCode, roundNumbers, previewItems, status, currencyCode } =
    formState
  const [currencyCodeString, setCurrencyCodeString] = useState(
    currencyCode === null ? '' : currencyCode
  )
  useEffect(
    function () {
      const currencyCode = currencyCodeString as CurrencyCode
      if (typeof currencies[currencyCode] !== 'undefined') {
        setFormState(currencyCode, 'currencyCode')
      }
    },
    [setFormState, currencyCodeString]
  )
  const [localeCodeString, setLocaleCodeString] = useState(
    localeCode === null ? '' : localeCode
  )
  return (
    <Fragment>
      <Preview previewItems={previewItems} status={status} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text>
          <Muted>Currency</Muted>
        </Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          filter
          onValueInput={setCurrencyCodeString}
          options={currencyCodeOptions}
          strict
          value={currencyCodeString}
        />
        <VerticalSpace space="medium" />
        <Checkbox
          name="roundNumbers"
          onValueChange={setFormState}
          value={roundNumbers}
        >
          <Text>Round numbers</Text>
        </Checkbox>
        <VerticalSpace space="large" />
        <Text>
          <Muted>Locale</Muted>
        </Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          filter
          onValueInput={setLocaleCodeString}
          options={localeCodeOptions}
          strict
          top
          value={localeCodeString}
        />
        <VerticalSpace space="extraLarge" />
        <Button
          {...initialFocus}
          disabled={disabled === true}
          fullWidth
          onClick={handleSubmit}
        >
          Convert Currency
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function computePreview(
  textNodePlainObjects: Array<TextNodePlainObject>,
  options: {
    currencyCode: null | CurrencyCode
    roundNumbers: boolean
    localeCode: null | LocaleCode
  }
): { status: Status; previewItems: Array<PreviewItem> } {
  const { currencyCode, roundNumbers, localeCode } = options
  if (textNodePlainObjects.length === 0) {
    return { previewItems: [], status: 'NO_TEXT_NODES' }
  }
  if (currencyCode === null || localeCode === null) {
    return { previewItems: [], status: 'INVALID_SETTINGS' }
  }
  const previewItems: Array<PreviewItem> = []
  const originalStrings: Record<string, true> = {} // track currency values we've already encountered before
  for (const { characters } of textNodePlainObjects) {
    characters.replace(moneyRegex, function (original: string) {
      if (originalStrings[original] === true) {
        return ''
      }
      originalStrings[original] = true
      const result = convertCurrency(original, {
        currencyCode,
        localeCode,
        roundNumbers
      })
      previewItems.push({ original, result })
      return ''
    })
  }
  return { previewItems, status: 'OK' }
}
