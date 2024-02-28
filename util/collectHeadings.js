import createHeadingSlug from '@/util/createHeadingSlug'

function collectHeadings(node, sections = []) {
  if (node) {
    if (node.name === 'Heading') {
      const title = node.children[0]

      const slug = createHeadingSlug(title)

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          slug,
          title,
        })
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections)
      }
    }
  }

  return sections
}

export default collectHeadings
