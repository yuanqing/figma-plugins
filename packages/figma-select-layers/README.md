# Select Layers [![Figma Plugin](https://badgen.net/badge/figma/Select%20Layers/yellow)](https://figma.com/c/plugin/799648692768237063/Select-Layers) [![npm Version](https://badgen.net/npm/v/figma-select-layers)](https://www.npmjs.com/package/figma-select-layers)

> A Figma plugin to select layers based on name, type, or similarity

[![Select Layers](https://raw.githubusercontent.com/yuanqing/figma-plugins/master/packages/figma-select-layers/media/cover.png)](https://figma.com/c/plugin/799648692768237063/Select-Layers)

`attributes` `hidden` `layers` `locked` `select` `selector` `similar` `similarity` `style` `styles` `type`

## Commands

### Select Layers by Name

Selects layers that partially or exactly match the given name.

### Select Layers by Type

Selects layers of a particular type:

- Component
- Instance Layer
- Frame
- Group
- Slice
- Vector Layer
- Rectangle
- Line
- Ellipse
- Polygon
- Star
- Boolean Group
- Image
- Text Layer

### Select Mask Layers / Hidden Layers / Locked Layers / Layers With Exports

Selects layers with the specified attribute.

### Select Parent Layers / Root Layers

Selects layers at the specified hierarchy.

### Select Similar Layers

Selects layers with one or more attributes that are identical to the one currently-selected layer.

---

With the exception of Select Similar Layers, all commands make a sub-selection within the currently-selected layers, or creates a new selection of layers if the selection is empty.

## License

MIT
