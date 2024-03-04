function TableOfContents({
  headings,
  minLevel = 0,
  maxLevel = 999,
  className = '',
}) {
  return (
    <div
      className={`TableOfContents noprint mt-0 block text-sm lg:float-right lg:max-w-xs lg:pl-8 2xl:fixed 2xl:left-[62rem] 2xl:float-none 2xl:max-h-screen 2xl:overflow-scroll ${className}`}
    >
      <h3 className='mt-0 pb-1'>In This Page</h3>
      <ul>
        {headings.map((heading) => {
          if (heading.level > maxLevel || heading.level < minLevel) {
            return null
          }
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
