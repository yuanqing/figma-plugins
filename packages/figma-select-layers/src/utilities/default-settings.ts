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
      fills: true,
      fillsStyleId: true
    },
    isMask: true,
    locked: true,
    opacity: true,
    rotation: true,
    stroke: {
      dashPattern: true,
      strokeAlign: true,
      strokeCap: true,
      strokeJoin: true,
      strokeWeight: true,
      strokes: true,
      strokesStyleId: true
    },
    text: {
      fontName: true,
      fontSize: true,
      letterSpacing: true,
      lineHeight: true,
      paragraphIndent: true,
      paragraphSpacing: true,
      textAlignHorizontal: true,
      textAlignVertical: true,
      textCase: true,
      textDecoration: true,
      textStyleId: true
    },
    type: true,
    visible: true
  }
}
