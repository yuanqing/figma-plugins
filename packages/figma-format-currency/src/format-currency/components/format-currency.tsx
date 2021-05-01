import {
  Button,
  Container,
  SegmentedControl,
  Text,
  TextboxAutocomplete,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { ComponentChildren, Fragment, h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Preview } from '../../components/preview/preview'
import { locales } from '../../utilities/data/locales'
import { formatCurrency } from '../../utilities/format-currency/format-currency'
import { moneyRegex } from '../../utilities/money-regex'
import {
  CurrencyFormat,
  LocaleCode,
  PreviewItem,
  Status,
  TextNodePlainObject
} from '../../utilities/types'
import {
  FormState,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types'
import { FormatCurrencyProps } from '../utilities/types'

const currencyFormatOptions: Array<{
  children: ComponentChildren
  value: CurrencyFormat
}> = [
  { children: 'Explicit', value: 'EXPLICIT' },
  { children: 'Short', value: 'SHORT' },
  { children: 'Retain', value: 'RETAIN' }
]
const localeCodeOptions = Object.keys(locales).map(function (
  localeCode: string
) {
  return { value: localeCode }
})

export function FormatCurrency(props: FormatCurrencyProps): JSX.Element {
  const {
    disabled,
    formState,
    handleSubmit,
    initialFocus,
    setFormState
  } = useForm<FormState>(
    { ...props, previewItems: [], status: 'OK' },
    {
      close: function () {
        emit('CLOSE_UI')
      },
      submit: function ({
        currencyFormat,
        localeCode,
        textNodePlainObjects
      }: FormState) {
        if (localeCode === null) {
          throw new Error('`localeCode` is `null`')
        }
        const result: Array<TextNodePlainObject> = []
        for (const { id, characters } of textNodePlainObjects) {
          result.push({
            characters: formatCurrency(characters, {
              currencyFormat,
              localeCode
            }),
            id
          })
        }
        emit<SubmitHandler>('SUBMIT', result, {
          currencyFormat,
          localeCode
        })
      },
      transform: function ({
        textNodePlainObjects,
        currencyFormat,
        localeCode
      }: FormState): FormState {
        const { previewItems, status } = computePreview(textNodePlainObjects, {
          currencyFormat,
          localeCode
        })
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
  const { localeCode, currencyFormat, previewItems, status } = formState
  const [localeCodeString, setLocaleCodeString] = useState(`${localeCode}`)
  useEffect(
    function () {
      const locale = localeCodeString as LocaleCode
      if (typeof locales[locale] !== 'undefined') {
        setFormState(locale, 'localeCode')
      }
    },
    [setFormState, localeCodeString]
  )
  return (
    <Fragment>
      <Preview previewItems={previewItems} status={status} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Format</Text>
        <VerticalSpace space="small" />
        <SegmentedControl
          name="currencyFormat"
          onValueChange={setFormState}
          options={currencyFormatOptions}
          value={currencyFormat}
        />
        <VerticalSpace space="large" />
        <Text muted>Locale</Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          filter
          onValueChange={setLocaleCodeString}
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
          Format Currency
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function computePreview(
  textNodePlainObjects: Array<TextNodePlainObject>,
  options: {
    currencyFormat: CurrencyFormat
    localeCode: null | LocaleCode
  }
): { status: Status; previewItems: Array<PreviewItem> } {
  const { currencyFormat, localeCode } = options
  if (textNodePlainObjects.length === 0) {
    return { previewItems: [], status: 'NO_TEXT_NODES' }
  }
  if (localeCode === null) {
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
      const result = formatCurrency(original, { currencyFormat, localeCode })
      previewItems.push({ original, result })
      return ''
    })
  }
  return { previewItems, status: 'OK' }
}
