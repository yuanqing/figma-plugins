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

export function SelectSimilarLayers(initialState) {
  const { state, handleChange, handleSubmit, isValid } = useForm(
    { ...initialState, searchTerm: '' },
    {
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
      },
      onSubmit: function ({ attributes }) {
        emit('SUBMIT', {
          attributes
        })
      },
      onClose: function () {
        emit('CLOSE_UI')
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
    function (object, newValue, targetKey) {
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
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        {searchTerm === '' ? (
          <label className={styles.checkToggle}>
            <input
              type="checkbox"
              checked={areAllAttributesChecked === true}
              onChange={handleCheckAllToggleChange}
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
        <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
          Select Similar Layers
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}
