import { Settings } from './types'

export const settingsKey = '2021-05-01'

export const defaultSettings: Settings = {
  selectLayersByName: {
    exactMatch: false,
    layerName: ''
  },
  selectSimilarNodes: {
    'blendMode': true,
    'cornerRadius.bottomLeftRadius': true,
    'cornerRadius.bottomRightRadius': true,
    'cornerRadius.topLeftRadius': true,
    'cornerRadius.topRightRadius': true,
    'dimension.height': true,
    'dimension.width': true,
    'effectsStyleId': true,
    'fill.fills': true,
    'fill.fillsStyleId': true,
    'isMask': true,
    'locked': true,
    'opacity': true,
    'rotation': true,
    'stroke.dashPattern': true,
    'stroke.strokeAlign': true,
    'stroke.strokeCap': true,
    'stroke.strokeJoin': true,
    'stroke.strokeWeight': true,
    'stroke.strokes': true,
    'stroke.strokesStyleId': true,
    'text.fontName': true,
    'text.fontSize': true,
    'text.letterSpacing': true,
    'text.lineHeight': true,
    'text.paragraphIndent': true,
    'text.paragraphSpacing': true,
    'text.textAlignHorizontal': true,
    'text.textAlignVertical': true,
    'text.textCase': true,
    'text.textDecoration': true,
    'text.textStyleId': true,
    'type': true,
    'visible': true
  }
}
