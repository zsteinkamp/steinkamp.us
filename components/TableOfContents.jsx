import { useHeadsObserver } from '@/hooks/HeadsObserver'

function TableOfContents({
  headings,
  minLevel = 0,
  maxLevel = 999,
  className = '',
}) {
  const { activeId } = useHeadsObserver()

  return (
    <div
      className={`TableOfContents noprint mt-0 block text-sm hover:opacity-100 lg:float-right lg:max-w-xs lg:pl-8 xl:fixed xl:left-[60rem] xl:float-none ${className}`}
    >
      <h3 className='mt-0 pb-1'>In This Page</h3>
      <ul className='max-h-[50vh] overflow-scroll xl:max-h-[85vh] '>
        {headings.map((heading) => {
          if (heading.level > maxLevel || heading.level < minLevel) {
            return null
          }
          return (
            <li
              key={heading.slug}
              className={`ml-${Math.max(0, (parseInt(heading.level) - 1) * 2)}`}
              style={{
                listStyleType: activeId === heading.slug ? 'disc' : 'circle',
              }}
            >
              <a
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(`#${heading.slug}`).scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
                href={`#${heading.slug}`}
              >
                {heading.title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TableOfContents
