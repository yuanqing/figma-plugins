/** @jsx h */
import {
  Button,
  Container,
  Divider,
  SearchTextbox,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'
import { Attributes } from './attributes.js'
import { checkAttributes } from '../utilities/check-attributes'
import { setAttribute } from '../utilities/set-attribute'
import { setAllAttributes } from '../utilities/set-all-attributes'
import styles from './select-similar-layers.scss'

export function SelectSimilarLayers (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    { ...initialState, searchTerm: '' },
    {
      transform: function (state) {
        const { attributes } = state
        return {
          ...state,
          areAllAttributesChecked: checkAttributes(attributes, true) === true
        }
      },
      validate: function ({ referenceLayerType, attributes }) {
        return (
          referenceLayerType !== null &&
          checkAttributes(attributes, false) === false
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ attributes }) {
        triggerEvent('SUBMIT', {
          attributes
        })
      }
    }
  )
  const {
    areAllAttributesChecked,
    attributes,
    referenceLayerType,
    searchTerm
  } = state
  const handleAttributeClick = useCallback(
    function (object, newValue, targetKey) {
      handleChange({
        ...state,
        attributes: setAttribute(state.attributes, targetKey, newValue)
      })
    },
    [handleChange, state]
  )
  const handleCheckAllToggleChange = useCallback(
    function () {
      const newValue = !(areAllAttributesChecked === true)
      handleChange({
        ...state,
        attributes: setAllAttributes(attributes, newValue)
      })
    },
    [areAllAttributesChecked, attributes, handleChange, state]
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        referenceLayerType
      }) {
        handleChange({ referenceLayerType })
      })
    },
    [handleChange]
  )
  return (
    <div>
      <div class={styles.wrapper}>
        <div class={styles.search}>
          <SearchTextbox
            name='searchTerm'
            placeholder='Search'
            value={searchTerm}
            onChange={handleChange}
            focused
          />
        </div>
        {searchTerm === '' ? (
          <label class={styles.checkToggle}>
            <input
              type='checkbox'
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
        searchTerm={searchTerm}
        referenceLayerType={referenceLayerType}
        onClick={handleAttributeClick}
      />
      <Divider />
      <Container space='medium'>
        <VerticalSpace space='small' />
        <Button
          fullWidth
          disabled={isInvalid() === true}
          onClick={handleSubmit}
        >
          Select Similar Layers
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </div>
  )
}
