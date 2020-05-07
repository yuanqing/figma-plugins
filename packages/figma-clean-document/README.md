# Clean Document [![Figma Plugin](https://img.shields.io/badge/figma-Clean%20Document-yellow?cacheSeconds=1800)](https://figma.com/c/plugin/767379019764649932/Clean-Document) [![npm Version](https://img.shields.io/npm/v/figma-clean-document?cacheSeconds=1800)](https://npmjs.com/package/figma-clean-document)

> A Figma plugin to automagically organize and clean up your Figma document

[![Clean Document](https://raw.githubusercontent.com/yuanqing/figma-plugins/master/packages/figma-clean-document/media/cover.png)](https://figma.com/c/plugin/767379019764649932/Clean-Document)

`clean` `format` `layers` `lint` `linter` `organize` `organizer` `pixels` `rename` `sort` `tidy`

## Commands

### Delete Hidden Layers

Deletes all hidden layers within the selection or on the current page.

### Ungroup Single-Layer Groups

Ungroups single-layer groups within the selection or on the current page that have no background, blend mode, effect or export setting.

### Make Pixel-Perfect

Rounds the X and Y position and dimensions of layers within the selection or on the current page to the nearest pixel.

### Smart Rename Layers

Intelligently renames layers within the selection or on the current page.

- Layers of type Text will be named based on their text content.
- Layers of type Instance will be given the same name as their Master Component.
- Layers of all other layer types will be named based on their layer type. (For example, a layer of type Rectangle will be named “Rectangle”, a layer of type Group will be named “Group”, and so on.)
- Layers with export settings will not be renamed.

Optionally specify a whitelist Regular Expression to skip the renaming of particular layers.

### Smart Sort Layers

Sort layers within the selection or on the current page by their X and Y position while maintaining their relative stacking order on the page.

### Clean Layers

Run all the above commands on layers within the selection or on the current page. Optionally skip processing of Locked layers.

### Sort Pages

Sorts pages of the current document in alphabetical order.

### Reset Plugin

Resets all settings to their defaults.

## License

[MIT](/LICENSE.md)
