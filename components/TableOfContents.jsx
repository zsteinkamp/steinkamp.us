function TableOfContents({ headings, className = '' }) {
  return (
    <div className={`TableOfContents ${className}`}>
      <h3 className='mt-0 pb-4'>In This Page</h3>
      <ul>
        {headings.map((heading) => {
          return (
            <li key={heading.slug} className={`level-${heading.level}`}>
              <a href={`#${heading.slug}`}>{heading.title}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TableOfContents
