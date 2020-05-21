/** @jsx h */
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
import { formatExplicit } from '../../utilities/currency/format-explicit'
import { formatRetain } from '../../utilities/currency/format-retain'
import { formatShort } from '../../utilities/currency/format-short'
import { isValidLocale } from '../../utilities/currency/is-valid-locale'
import { moneyRegex } from '../../utilities/currency/money-regex'
import { EXPLICIT, RETAIN, SHORT } from '../formats'

const localesJson = require('../../utilities/currency/data/locales.json')

const formatters: { [key: string]: any } = {
  [EXPLICIT]: formatExplicit,
  [RETAIN]: formatRetain,
  [SHORT]: formatShort
}

const locales = localesJson.map(function (locale: string) {
  return { value: locale }
})

export function FormatCurrency(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
    transform: function (state) {
      const { nodes, format, locale } = state
      return {
        ...state,
        preview: computePreview({
          nodes,
          format,
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
    onSubmit: function ({ nodes, format, locale }) {
      const formatter = formatters[format]
      const result = nodes.map(function ({
        id,
        characters
      }: TextNodeAttributes) {
        return {
          id,
          characters: formatter(characters, locale)
        }
      })
      emit('SUBMIT', {
        nodes: result,
        format,
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
  const { format, locale, preview } = state
  return (
    <Fragment>
      <Preview {...preview} />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Format</Text>
        <VerticalSpace space="small" />
        <SegmentedControl
          name="format"
          value={format}
          options={[{ value: EXPLICIT }, { value: SHORT }, { value: RETAIN }]}
          onChange={handleChange}
        />
        <VerticalSpace space="large" />
        <Text muted>Locale</Text>
        <VerticalSpace space="small" />
        <TextboxAutocomplete
          name="locale"
          value={locale}
          options={locales}
          onChange={handleChange}
          top
        />
        <VerticalSpace space="extraLarge" />
        <Button
          fullWidth
          disabled={isValid() === false}
          focused
          onClick={handleSubmit}
        >
          Format Currency
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}

function computePreview(options: {
  nodes: Array<TextNodeAttributes>
  format: string
  locale: string
}): PreviewProps {
  const { nodes, format, locale } = options
  if (isValidLocale(locale) === false) {
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
      const formatter = formatters[format]
      items.push({
        original,
        result: formatter(original, locale)
      })
      return '' // FIXME
    })
  })
  return { items }
}
