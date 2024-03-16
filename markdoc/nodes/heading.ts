import { Tag } from '@markdoc/markdoc'
import { RenderableTreeNode, Node, Config } from '@markdoc/markdoc'
import createHeadingSlug from '@/util/createHeadingSlug'

import { Heading } from '@/components/Heading'

function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, any>
) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  const title = children.filter((child) => typeof child === 'string').join(' ')
  return createHeadingSlug(title)
}

export const heading = {
  render: Heading,
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    const id = generateID(children, attributes)

    return new Tag(this.render.toString(), { ...attributes, id }, children)
  },
}
