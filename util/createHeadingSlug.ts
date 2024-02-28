function createHeadingSlug(title: string) {
  return title
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export default createHeadingSlug