import { useHeadsObserver } from '@/hooks/HeadsObserver'

function TableOfContents({
  headings,
  minLevel = 0,
  maxLevel = 999,
  className = '',
}) {
  const { activeId } = useHeadsObserver()

  const fullHeadings = [
    {
      level: 2,
      slug: 'top',
      title: 'Top',
    },
    ...headings,
  ]

  return (
    <div
      className={`TableOfContents noprint mt-[0.7rem] block text-sm hover:opacity-100 lg:float-right lg:max-w-[15rem] lg:pl-8 xl:fixed xl:left-[calc(50vw+24rem)] xl:top-[2.8rem] xl:w-[12rem] xl:pl-0 ${className}`}
    >
      <div className='mt-0 pb-1 font-header text-xl font-bold text-header'>
        In This Page
      </div>
      <ul className='max-h-[50vh] overflow-y-auto xl:max-h-[85vh] '>
        {fullHeadings.map((heading) => {
          if (heading.level > maxLevel || heading.level < minLevel) {
            return null
          }
          return (
            <li
              key={heading.slug}
              className={`pl-0.5 pb-1 ml-${Math.max(0, (parseInt(heading.level) - 1) * 2)}`}
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
