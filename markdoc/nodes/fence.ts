import { Tag } from '@markdoc/markdoc'
import { Node, Config } from '@markdoc/markdoc'

import { CodeBlock } from '@/components/CodeBlock'

// Override Markdoc's built-in fence so fenced code blocks render through
// CodeBlock (prism-react-renderer) instead of a plain <pre><code>.
export const fence = {
  render: CodeBlock,
  attributes: {
    content: { type: String, render: true, required: true },
    language: { type: String, render: true },
    process: { type: Boolean, render: false, default: true },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    return new Tag(this.render.toString(), attributes, children)
  },
}
