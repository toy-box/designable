import { LinkTarget, LinkActiont } from '@toy-box/freepage-components'

export const handleLinkAction = (linkAction: LinkActiont) => {
  window.open(linkAction.url, linkAction.target)
}
