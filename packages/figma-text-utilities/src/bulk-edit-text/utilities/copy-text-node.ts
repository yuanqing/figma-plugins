import { loadFontsAsync } from '@create-figma-plugin/utilities'

export async function copyTextNode(
  sourceTextNode: TextNode,
  destinationTextNode: TextNode
): Promise<void> {
  const styledTextSegments = sourceTextNode.getStyledTextSegments([
    'fills',
    'fillStyleId',
    'fontName',
    'fontSize',
    'hyperlink',
    'indentation',
    'letterSpacing',
    'lineHeight',
    'listOptions',
    'textCase',
    'textDecoration',
    'textStyleId'
  ])
  await loadFontsAsync([sourceTextNode, destinationTextNode])
  destinationTextNode.characters = sourceTextNode.characters
  for (const styledTextSegment of styledTextSegments) {
    const { start, end } = styledTextSegment
    destinationTextNode.setRangeFills(start, end, styledTextSegment.fills)
    destinationTextNode.setRangeFillStyleId(
      start,
      end,
      styledTextSegment.fillStyleId
    )
    destinationTextNode.setRangeFontName(start, end, styledTextSegment.fontName)
    destinationTextNode.setRangeFontSize(start, end, styledTextSegment.fontSize)
    destinationTextNode.setRangeHyperlink(
      start,
      end,
      styledTextSegment.hyperlink
    )
    destinationTextNode.setRangeIndentation(
      start,
      end,
      styledTextSegment.indentation
    )
    destinationTextNode.setRangeLetterSpacing(
      start,
      end,
      styledTextSegment.letterSpacing
    )
    destinationTextNode.setRangeLetterSpacing(
      start,
      end,
      styledTextSegment.letterSpacing
    )
    destinationTextNode.setRangeLineHeight(
      start,
      end,
      styledTextSegment.lineHeight
    )
    destinationTextNode.setRangeListOptions(
      start,
      end,
      styledTextSegment.listOptions
    )
    destinationTextNode.setRangeTextCase(start, end, styledTextSegment.textCase)
    destinationTextNode.setRangeTextDecoration(
      start,
      end,
      styledTextSegment.textDecoration
    )
    destinationTextNode.setRangeTextStyleId(
      start,
      end,
      styledTextSegment.textStyleId
    )
  }
}
