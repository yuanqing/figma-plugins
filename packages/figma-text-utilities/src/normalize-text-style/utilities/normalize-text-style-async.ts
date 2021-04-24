import { loadFontsAsync } from '@create-figma-plugin/utilities'

export async function normalizeTextStyleAsync(
  nodes: Array<TextNode>
): Promise<void> {
  await loadFontsAsync(nodes)
  for (const node of nodes) {
    const length = node.characters.length
    const fillStyleId = node.getRangeFillStyleId(0, 1)
    if (fillStyleId !== '') {
      if (fillStyleId === figma.mixed) {
        throw new Error('Invariant violation')
      }
      node.setRangeFillStyleId(0, length, fillStyleId)
    } else {
      const fills = node.getRangeFills(0, 1)
      if (fills === figma.mixed) {
        throw new Error('Invariant violation')
      }
      node.setRangeFills(0, length, fills)
    }
    const textStyleId = node.getRangeTextStyleId(0, 1)
    if (textStyleId !== '') {
      if (textStyleId === figma.mixed) {
        throw new Error('Invariant violation')
      }
      node.setRangeTextStyleId(0, length, textStyleId)
    } else {
      const fontSize = node.getRangeFontSize(0, 1)
      const fontName = node.getRangeFontName(0, 1)
      const letterSpacing = node.getRangeLetterSpacing(0, 1)
      const lineHeight = node.getRangeLineHeight(0, 1)
      const textCase = node.getRangeTextCase(0, 1)
      const textDecoration = node.getRangeTextDecoration(0, 1)
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
      node.setRangeFontSize(0, length, fontSize)
      node.setRangeFontName(0, length, fontName)
      node.setRangeLetterSpacing(0, length, letterSpacing)
      node.setRangeLineHeight(0, length, lineHeight)
      node.setRangeTextCase(0, length, textCase)
      node.setRangeTextDecoration(0, length, textDecoration)
    }
  }
}
