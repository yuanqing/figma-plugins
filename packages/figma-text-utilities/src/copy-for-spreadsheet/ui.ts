import { render } from '@create-figma-plugin/ui'

import { copyTextToClipboardFactory } from '../components/copy-text-to-clipboard-factory.js'

export default render(
  copyTextToClipboardFactory({
    copyButtonLabel: 'Copy for Spreadsheet'
  })
)
