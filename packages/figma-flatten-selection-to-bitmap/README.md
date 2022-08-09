# Flatten Selection to Bitmap [![Figma Plugin](https://img.shields.io/badge/figma-Flatten%20Selection%20to%20Bitmap-yellow?cacheSeconds=1800)](https://figma.com/community/plugin/837846252158418235/Flatten-Selection-to-Bitmap) [![npm Version](https://img.shields.io/npm/v/figma-flatten-selection-to-bitmap?cacheSeconds=1800)](https://npmjs.com/package/figma-flatten-selection-to-bitmap)

> A Figma plugin to rasterize layers at a high resolution

[![Flatten Selection to Bitmap](https://raw.githubusercontent.com/yuanqing/figma-plugins/main/packages/figma-flatten-selection-to-bitmap/media/cover.png)](https://figma.com/community/plugin/837846252158418235/Flatten-Selection-to-Bitmap)

`asset` `bitmap` `export` `flatten` `image` `images` `resolution`

## Commands

### Flatten Selection to Bitmap

Rasterize the selected layers at a high resolution (`2x`, `3x`, `4x`, `8x`, or `10x`). (This is to work around a limitation in Figma where layers can only be rasterized at `1x` resolution.)

If layers in the selection contain strokes or effects that extend beyond the layers’ bounding box, the position of the resulting image layer may be different from that of the original layers.

### Settings

Set the resolution at which layers are to be rasterized.

## License

[MIT](/LICENSE.md)
