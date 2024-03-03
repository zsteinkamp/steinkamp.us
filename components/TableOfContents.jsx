function TableOfContents({ headings, className = '' }) {
  return (
    <div
      className={`TableOfContents mt-0 block text-sm lg:float-right lg:pl-8 lg:[max-width:var(--toc-width)] 2xl:fixed 2xl:left-[64rem] 2xl:float-none 2xl:max-w-xs ${className}`}
    >
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
