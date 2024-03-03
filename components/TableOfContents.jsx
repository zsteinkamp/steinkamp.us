function TableOfContents({ headings, className = '' }) {
  return (
    <div
      className={`TableOfContents mt-0 block text-sm lg:float-right lg:max-w-xs lg:pl-8 2xl:fixed 2xl:left-[62rem] 2xl:float-none ${className}`}
    >
      <h3 className='mt-0 pb-4'>In This Page</h3>
      <ul>
        {headings.map((heading) => {
          return (
            <li
              key={heading.slug}
              className={`ml-${Math.max(0, (parseInt(heading.level) - 1) * 2)}`}
            >
              <a href={`#${heading.slug}`}>{heading.title}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TableOfContents
