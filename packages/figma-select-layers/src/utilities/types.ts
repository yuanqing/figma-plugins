export type Settings = {
  selectLayersByName: {
    exactMatch: boolean
    layerName: string
  }
  selectSimilarNodes: {
    'blendMode': boolean
    'cornerRadius.bottomLeftRadius': boolean
    'cornerRadius.bottomRightRadius': boolean
    'cornerRadius.topLeftRadius': boolean
    'cornerRadius.topRightRadius': boolean
    'dimension.height': boolean
    'dimension.width': boolean
    'effectsStyleId': boolean
    'fill.fills': boolean
    'fill.fillsStyleId': boolean
    'isMask': boolean
    'locked': boolean
    'opacity': boolean
    'rotation': boolean
    'stroke.dashPattern': boolean
    'stroke.strokeAlign': boolean
    'stroke.strokeCap': boolean
    'stroke.strokeJoin': boolean
    'stroke.strokeWeight': boolean
    'stroke.strokes': boolean
    'stroke.strokesStyleId': boolean
    'text.fontName': boolean
    'text.fontSize': boolean
    'text.letterSpacing': boolean
    'text.lineHeight': boolean
    'text.paragraphIndent': boolean
    'text.paragraphSpacing': boolean
    'text.textAlignHorizontal': boolean
    'text.textAlignVertical': boolean
    'text.textCase': boolean
    'text.textDecoration': boolean
    'text.textStyleId': boolean
    'type': boolean
    'visible': boolean
  }
}
