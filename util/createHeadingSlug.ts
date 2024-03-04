function createHeadingSlug(title: string): string {
  if (typeof (title) !== 'string') {
    return 'unknown'
  }
  return (title || "")
    .replace(/[^a-z0-9 ]/ig, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export default createHeadingSlug