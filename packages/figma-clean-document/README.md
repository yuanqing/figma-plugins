# Clean Document [![npm Version](https://img.shields.io/npm/v/figma-clean-document.svg)](https://www.npmjs.com/package/figma-clean-document)

> A Figma plugin to automagically organize and clean up your Figma document

## Commands

### Sort Pages

Sorts pages of the current document in alphabetical order.

### Delete Hidden Layers

Deletes all hidden layers within the selection or on the current page.

### Ungroup Single-Layer Groups

Ungroups single-layer groups that have no backgrounds, blend modes, effects or export settings.

### Smart Rename Layers

Intelligently renames layers within the selection or on the current page.

- Layers of type `Text` will be named based on their text content.
- Layers of type `Instance` will be given the same name as their Master Component.
- Layers of all other layer types will be named based on their layer type. (For example, a layer of type `Rectangle` will be named “Rectangle”, a layer of type `Group` will be named “Group”, and so on.)

Optionally specify a whitelist Regular Expression to skip the renaming of particular layers.

### Smart Sort Layers

Sort layers within the selection or on the current page by their X and Y position while maintaining their relative stacking order on the page.

### Clean Document

Run the above commands on the entire document, the current page, or the selection.

## License

MIT
