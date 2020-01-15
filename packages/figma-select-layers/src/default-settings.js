export const defaultSettings = {
  selectLayersByName: {
    exactMatch: false,
    layerName: ''
  },
  selectSimilarLayers: {
    blendMode: true,
    cornerRadius: {
      bottomLeftRadius: true,
      bottomRightRadius: true,
      topLeftRadius: true,
      topRightRadius: true
    },
    dimension: {
      height: true,
      width: true
    },
    effectsStyleId: true,
    fill: {
      fillsStyleId: true,
      fills: true
    },
    type: true,
    locked: true,
    isMask: true,
    opacity: true,
    rotation: true,
    stroke: {
      dashPattern: true,
      strokeAlign: true,
      strokeCap: true,
      strokesStyleId: true,
      strokeJoin: true,
      strokeWeight: true,
      strokes: true
    },
    text: {
      textCase: true,
      fontName: true,
      fontSize: true,
      letterSpacing: true,
      lineHeight: true,
      paragraphIndent: true,
      paragraphSpacing: true,
      textAlignHorizontal: true,
      textAlignVertical: true,
      textDecoration: true,
      textStyleId: true
    },
    visible: true
  }
}
