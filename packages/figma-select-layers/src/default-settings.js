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
      width: true,
      height: true
    },
    effectsStyleId: true,
    fill: {
      fills: true,
      fillsStyleId: true
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
      strokeJoin: true,
      strokesStyleId: true,
      strokeWeight: true
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
    visible: true
  }
}
