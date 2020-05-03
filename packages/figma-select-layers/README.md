# Select Layers [![Figma Plugin](https://img.shields.io/badge/figma-Select%20Layers-yellow?cacheSeconds=1800)](https://figma.com/c/plugin/799648692768237063/Select-Layers) [![npm Version](https://img.shields.io/npm/v/figma-select-layers?cacheSeconds=1800](https://npmjs.com/package/figma-select-layers)

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

### Reset Plugin

Resets all settings to their defaults.

---

With the exception of Select Similar Layers, all commands make a sub-selection within the currently-selected layers, or creates a new selection of layers if the selection is empty.

## License

[MIT](/LICENSE.md)
