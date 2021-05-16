import { NodeAttributes } from './types.js'

export const labels: Record<keyof NodeAttributes, string> = {
  'blendMode': 'Blend mode',
  'cornerRadius.bottomLeftRadius': 'Bottom-left radius',
  'cornerRadius.bottomRightRadius': 'Bottom-right radius',
  'cornerRadius.topLeftRadius': 'Top-left radius',
  'cornerRadius.topRightRadius': 'Top-right radius',
  'dimension.height': 'Height',
  'dimension.width': 'Width',
  'effectsStyleId': 'Effects style',
  'fill.fills': 'Fills',
  'fill.fillsStyleId': 'Fills color style',
  'isMask': 'Mask state',
  'locked': 'Locked state',
  'opacity': 'Opacity',
  'rotation': 'Rotation',
  'stroke.dashPattern': 'Dash pattern',
  'stroke.strokeAlign': 'Stroke alignment',
  'stroke.strokeCap': 'Stroke cap',
  'stroke.strokeJoin': 'Stroke join',
  'stroke.strokeWeight': 'Stroke weight',
  'stroke.strokes': 'Strokes',
  'stroke.strokesStyleId': 'Stroke color style',
  'text.fontName': 'Font name',
  'text.fontSize': 'Font size',
  'text.letterSpacing': 'Letter-spacing',
  'text.lineHeight': 'Line-height',
  'text.paragraphIndent': 'Paragraph indent',
  'text.paragraphSpacing': 'Paragraph spacing',
  'text.textAlignHorizontal': 'Text horizontal alignment',
  'text.textAlignVertical': 'Text vertical alignment',
  'text.textCase': 'Case',
  'text.textDecoration': 'Text decoration',
  'text.textStyleId': 'Text style',
  'type': 'Layer type',
  'visible': 'Visibility'
}

export const categoryLabels: Record<string, string> = {
  cornerRadius: 'Corner radius',
  dimension: 'Dimension',
  fill: 'Fill',
  stroke: 'Stroke',
  text: 'Text'
}
