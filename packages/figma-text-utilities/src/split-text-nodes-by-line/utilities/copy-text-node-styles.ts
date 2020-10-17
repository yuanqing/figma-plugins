export function copyTextNodeStyles(
  targetNode: TextNode,
  sourceNode: TextNode,
  offset: number
) {
  let index = 0
  const length = targetNode.characters.length
  while (index < length) {
    const fillStyleId = sourceNode.getRangeFillStyleId(
      offset + index,
      offset + index + 1
    )
    if (fillStyleId !== '') {
      if (fillStyleId === figma.mixed) {
        throw new Error('Invariant violation')
      }
      targetNode.setRangeFillStyleId(index, index + 1, fillStyleId)
    } else {
      const fills = sourceNode.getRangeFills(offset + index, offset + index + 1)
      if (fills === figma.mixed) {
        throw new Error('Invariant violation')
      }
      targetNode.setRangeFills(index, index + 1, fills)
    }
    const textStyleId = sourceNode.getRangeTextStyleId(
      offset + index,
      offset + index + 1
    )
    if (textStyleId !== '') {
      if (textStyleId === figma.mixed) {
        throw new Error('Invariant violation')
      }
      targetNode.setRangeTextStyleId(index, index + 1, textStyleId)
    } else {
      const fontSize = sourceNode.getRangeFontSize(
        offset + index,
        offset + index + 1
      )
      const fontName = sourceNode.getRangeFontName(
        offset + index,
        offset + index + 1
      )
      const letterSpacing = sourceNode.getRangeLetterSpacing(
        offset + index,
        offset + index + 1
      )
      const lineHeight = sourceNode.getRangeLineHeight(
        offset + index,
        offset + index + 1
      )
      const textCase = sourceNode.getRangeTextCase(
        offset + index,
        offset + index + 1
      )
      const textDecoration = sourceNode.getRangeTextDecoration(
        offset + index,
        offset + index + 1
      )
      if (
        fontSize === figma.mixed ||
        fontName === figma.mixed ||
        letterSpacing === figma.mixed ||
        lineHeight === figma.mixed ||
        textCase === figma.mixed ||
        textDecoration === figma.mixed
      ) {
        throw new Error('Invariant violation')
      }
      targetNode.setRangeFontSize(index, index + 1, fontSize)
      targetNode.setRangeFontName(index, index + 1, fontName)
      targetNode.setRangeLetterSpacing(index, index + 1, letterSpacing)
      targetNode.setRangeLineHeight(index, index + 1, lineHeight)
      targetNode.setRangeTextCase(index, index + 1, textCase)
      targetNode.setRangeTextDecoration(index, index + 1, textDecoration)
    }
    index += 1
  }
  if (sourceNode.textAutoResize === 'WIDTH_AND_HEIGHT') {
    targetNode.textAutoResize = 'WIDTH_AND_HEIGHT'
  } else {
    targetNode.resize(sourceNode.width, targetNode.height)
    targetNode.textAutoResize = 'HEIGHT'
  }
  targetNode.paragraphSpacing = sourceNode.paragraphSpacing
  targetNode.paragraphIndent = sourceNode.paragraphIndent
}
