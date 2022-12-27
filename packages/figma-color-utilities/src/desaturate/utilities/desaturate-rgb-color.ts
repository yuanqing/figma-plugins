import {
  convertHexColorToRgbColor,
  convertRgbColorToHexColor
} from '@create-figma-plugin/utilities'
import tinycolor from 'tinycolor2'

export function desaturateRgbColor(rgbColor: RGB): RGB {
  const hexColor = convertRgbColorToHexColor(rgbColor) as string
  const result = tinycolor(`#${hexColor}`).greyscale().toString()
  return convertHexColorToRgbColor(result.slice(1)) as RGB
}
