/** @jsx h */
import {
  Button,
  Container,
  Divider,
  SearchTextbox,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'

import { everyAttribute } from '../utilities/every-attribute'
import { extractKeysByReferenceLayerType } from '../utilities/extract-keys-by-reference-layer-type'
import { extractKeysBySearchTerm } from '../utilities/extract-keys-by-search-term'
import { setAttribute } from '../utilities/set-attribute'
import { toggleAttributes } from '../utilities/toggle-attributes'
import { Attributes } from './attributes'
import styles from './select-similar-layers.scss'

export function SelectSimilarLayers(props: {
  [key: string]: any
}): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(
    { ...props, searchTerm: '' },
    {
      onClose: function () {
        emit('CLOSE_UI')
      },
      onSubmit: function ({ attributes }) {
        emit('SUBMIT', {
          attributes
        })
      },
      transform: function (state) {
        const { attributes, referenceLayerType, searchTerm } = state
        const keysByReferenceLayerType = extractKeysByReferenceLayerType(
          attributes,
          referenceLayerType
        )
        const keysBySearchTerm = extractKeysBySearchTerm(attributes, searchTerm)
        return {
          ...state,
          areAllAttributesChecked:
            everyAttribute(attributes, keysByReferenceLayerType, true) === true,
          keysByReferenceLayerType,
          keysBySearchTerm
        }
      },
      validate: function ({
        attributes,
        keysByReferenceLayerType,
        referenceLayerType
      }) {
        return (
          referenceLayerType !== null &&
          everyAttribute(attributes, keysByReferenceLayerType, false) === false
        )
      }
    }
  )
  const {
    areAllAttributesChecked,
    attributes,
    keysByReferenceLayerType,
    keysBySearchTerm,
    searchTerm
  } = state
  const handleAttributeClick = useCallback(
    function (_: any, newValue: string, targetKey: string) {
      const { attributes } = state
      handleChange({
        ...state,
        attributes: setAttribute(attributes, targetKey, newValue)
      })
    },
    [handleChange, state]
  )
  const handleCheckAllToggleChange = useCallback(
    function () {
      const newValue = !(areAllAttributesChecked === true)
      handleChange({
        ...state,
        attributes: toggleAttributes(
          attributes,
          keysByReferenceLayerType,
          newValue
        )
      })
    },
    [
      areAllAttributesChecked,
      attributes,
      keysByReferenceLayerType,
      handleChange,
      state
    ]
  )
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ referenceLayerType }) {
        handleChange({ referenceLayerType })
      })
    },
    [handleChange]
  )
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <SearchTextbox
            name="searchTerm"
            onChange={handleChange}
            placeholder="Search"
            value={searchTerm}
          />
        </div>
        {searchTerm === '' ? (
          <label className={styles.checkToggle}>
            <input
              checked={areAllAttributesChecked === true}
              onChange={handleCheckAllToggleChange}
              type="checkbox"
            />{' '}
            {areAllAttributesChecked === true ? 'Uncheck all' : 'Check all'}
          </label>
        ) : null}
      </div>
      <Divider />
      <Attributes
        attributes={attributes}
        keysByReferenceLayerType={keysByReferenceLayerType}
        keysBySearchTerm={keysBySearchTerm}
        onAttributeClick={handleAttributeClick}
      />
      <Divider />
      <Container space="medium">
        <VerticalSpace space="small" />
        <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
          Select Similar Layers
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}
