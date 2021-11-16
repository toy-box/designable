import { LinkTarget, LinkActiont } from '@toy-box/freepage-components'

export const haneleLinkAction = (linkAction: LinkActiont) => {
  window.open(linkAction.url, linkAction.target)
}
