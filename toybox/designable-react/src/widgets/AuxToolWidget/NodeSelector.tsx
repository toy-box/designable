import React, { useEffect, useState, useRef } from 'react'
import { TreeNode } from '@designable/core'
import { observer } from '@formily/reactive-react'
import cls from 'classnames'
import { useHover, useSelection, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'

const useMouseHover = <T extends { current: HTMLElement }>(
  ref: T,
  enter?: () => void,
  leave?: () => void
) => {
  useEffect(() => {
    let timer = null
    let unmounted = false
    const onMouseOver = (e: MouseEvent) => {
      const target: HTMLElement = e.target as any
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (unmounted) return
        if (ref?.current?.contains(target)) {
          enter && enter()
        } else {
          leave && leave()
        }
      }, 100)
    }

    document.addEventListener('mouseover', onMouseOver)
    return () => {
      unmounted = true
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [])
}

export interface INodeSelectorProps {
  node: TreeNode
  style?: React.CSSProperties
}

export const NodeSelector: React.FC<INodeSelectorProps> = observer(
  ({ node }) => {
    const hover = useHover()
    const [expand, setExpand] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const selection = useSelection()
    const prefix = usePrefix('aux-node-selector')
    const parents = node.getParents()
    const renderIcon = (node: TreeNode) => {
      const icon = node.designerProps.icon
      if (icon) {
        return <IconWidget infer={icon} />
      }
      if (node === node.root) {
        return <IconWidget infer="Page" />
      } else if (node.designerProps?.droppable) {
        return <IconWidget infer="Container" />
      }
      return <IconWidget infer="Component" />
    }

    const renderParents = () => {
      return (
        <React.Fragment>
          {parents
            .reverse()
            .slice(0, 4)
            .map((parent, index) => {
              return (
                <span
                  key={index}
                  className={cls(prefix + '-parent-node', { expand })}
                >
                  {index > 0 && <IconWidget infer="RightDropArrow" />}
                  <span
                    onClick={() => {
                      selection.select(parent.id)
                    }}
                    onMouseEnter={() => {
                      hover.setHover(parent)
                    }}
                  >
                    <NodeTitleWidget node={parent} />
                  </span>
                </span>
              )
            })}
        </React.Fragment>
      )
    }

    const renderArrow = () => {
      if (parents.length > 0) {
        return expand ? (
          <IconWidget infer="RightDropArrow" />
        ) : (
          <IconWidget infer="LeftDropArrow" />
        )
      }
      return null
    }

    useMouseHover(
      ref,
      () => {
        setExpand(true)
      },
      () => {
        setExpand(false)
      }
    )

    return (
      <div ref={ref} className={prefix} style={{ transform: 'scale(0.85)' }}>
        {renderParents()}
        <span
          className={prefix + '-node'}
          onMouseEnter={() => {
            hover.setHover(node)
          }}
        >
          {renderArrow()}
          <span>
            <NodeTitleWidget node={node} showId />
          </span>
        </span>
      </div>
    )
  }
)

NodeSelector.displayName = 'NodeSelector'
