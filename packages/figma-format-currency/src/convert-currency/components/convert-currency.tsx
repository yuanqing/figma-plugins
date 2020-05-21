/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Text,
  TextboxAutocomplete,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useEffect } from 'preact/hooks'

import {
  INVALID_SETTINGS,
  NO_TEXT_NODES,
  Preview,
  PreviewItem,
  PreviewProps
} from '../../components/preview/preview'
import { TextNodeAttributes } from '../../types'
import { convertCurrency } from '../../utilities/currency/convert-currency'
import { isValidLocale } from '../../utilities/currency/is-valid-locale'
import { moneyRegex } from '../../utilities/currency/money-regex'

const isoCodes = require('../../utilities/currency/data/iso-codes.json')
const localesJson = require('../../utilities/currency/data/locales.json')

const currencies = Object.keys(isoCodes).map(function (isoCode) {
  return { value: isoCode }
})

const locales = localesJson.map(function (locale: string) {
  return { value: locale }
})

export function ConvertCurrency(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
    transform: function (state) {
      const { nodes, targetCurrency, roundNumbers, locale } = state
      return {
        ...state,
        preview: computePreview({
          nodes,
          targetCurrency,
          roundNumbers,
          locale
        })
      }
    },
    validate: function ({ preview }) {
      return (
        preview !== INVALID_SETTINGS &&
        preview !== NO_TEXT_NODES &&
        preview.items.length > 0
      )
    },
    onSubmit: function ({ nodes, targetCurrency, roundNumbers, locale }) {
      const result = nodes.map(function ({
        id,
        characters
      }: TextNodeAttributes) {
        return {
          id,
          characters: convertCurrency({
            string: characters,
            targetCurrency,
            roundNumbers,
            locale
          })
        }
      })
      emit('SUBMIT', {
        nodes: result,
        targetCurrency,
        roundNumbers,
        locale
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ nodes }) {
        handleChange({ nodes })
      })
    },
    [handleChange]
  )
  const { locale, preview, roundNumbers, targetCurrency } = state
  return (
    <Fragment>
      <Preview {...preview} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Currency</Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          name="targetCurrency"
          value={targetCurrency}
          options={currencies}
          onChange={handleChange}
          filter
          strict
        />
        <VerticalSpace space="small" />
        <Checkbox
          name="roundNumbers"
          value={roundNumbers === true}
          onChange={handleChange}
        >
          <Text>Round numbers</Text>
        </Checkbox>
        <VerticalSpace space="large" />
        <Text muted>Locale</Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          name="locale"
          value={locale}
          options={locales}
          onChange={handleChange}
          filter
          top
        />
        <VerticalSpace space="extraLarge" />
        <Button
          fullWidth
          disabled={isValid() === false}
          focused
          onClick={handleSubmit}
        >
          Convert Currency
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function computePreview(options: {
  nodes: Array<TextNodeAttributes>
  targetCurrency: string
  roundNumbers: boolean
  locale: string
}): PreviewProps {
  const { nodes, targetCurrency, roundNumbers, locale } = options
  if (
    typeof isoCodes[targetCurrency] === 'undefined' ||
    isValidLocale(locale) === false
  ) {
    return { error: INVALID_SETTINGS }
  }
  if (nodes.length === 0) {
    return { error: NO_TEXT_NODES }
  }
  const items: Array<PreviewItem> = []
  const originalStrings: { [key: string]: any } = {}
  nodes.forEach(function ({ characters }) {
    characters.replace(moneyRegex, function (original) {
      if (originalStrings[original] === true) {
        return '' // FIXME
      }
      originalStrings[original] = true
      items.push({
        original,
        result: convertCurrency({
          string: original,
          targetCurrency,
          roundNumbers,
          locale
        })
      })
      return '' // FIXME
    })
  })
  return { items }
}
