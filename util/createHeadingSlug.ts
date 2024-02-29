function createHeadingSlug(title: string): string {
  if (typeof (title) !== 'string') {
    return 'unknown'
  }
  return (title || "")
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export default createHeadingSlug