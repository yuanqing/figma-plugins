import { render } from '@create-figma-plugin/ui'

import { createFrameUtilitiesComponent } from '../components/create-frame-utilities-component.js'

export default render(
  createFrameUtilitiesComponent({
    allowNullPadding: true,
    buttonLabel: 'Frame Selection With Padding'
  })
)
