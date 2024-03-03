// ./components/SiteHeader.jsx
import Link from 'next/link'
import ThemeSwitcher from '@/components/ThemeSwitcher'

const SiteHeader = ({ className = '' }) => {
  const links = [
    { label: 'Posts', href: '/' },
    { label: 'Photos', href: 'https://photos.steinkamp.us/', target: '_blank' },
    {
      label: "Pop's Pages",
      href: 'https://dick.steinkamp.us/',
      target: '_blank',
    },
    { label: 'Music', href: '/music' },
    { label: 'Plugins', href: '/music-tools' },
    { label: 'Resume', href: '/resume' },
    { label: 'About', href: '/about' },
  ]

  const linkColorClasses =
    'dark:hover:text-whitepage-link text-stone-600 visited:text-stone-600 hover:text-black dark:text-stone-400 dark:visited:text-stone-400'

  return (
    <>
      <header
        className={`SiteHeader noprint ml-4 mb-4 flex h-[4.5rem] items-center border-b-2 border-stone-200 dark:border-stone-800 md:sticky md:top-12 md:mt-12 md:ml-4 md:mr-4 md:flex-col md:border-b-0 ${className}`}
      >
        <figure title='steinkamp.us'>
          <h1 className='dark:visited:text-stone-200; font-header text-3xl text-stone-800 visited:text-stone-800 hover:text-black dark:text-stone-200 dark:hover:text-white'>
            <ThemeSwitcher className='translate-y-[3px] pr-2' />
            <Link href={'/'} className={linkColorClasses}>
              steinkamp.us
            </Link>
          </h1>
        </figure>
        <nav className='site-nav flex grow justify-end gap-8'>
          <input type='checkbox' id='nav-trigger' className='nav-trigger' />
          <label htmlFor='nav-trigger'>
            <span className='menu-icon'>
              <svg viewBox='0 0 18 15' width='1.5rem' height='1.5rem'>
                <path d='M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.032C17.335,0,18,0.665,18,1.484L18,1.484z M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.032C17.335,6.031,18,6.696,18,7.516L18,7.516z M18,13.516C18,14.335,17.335,15,16.516,15H1.484 C0.665,15,0,14.335,0,13.516l0,0c0-0.82,0.665-1.483,1.484-1.483h15.032C17.335,12.031,18,12.695,18,13.516L18,13.516z' />
              </svg>
            </span>
          </label>

          <div className='trigger font-header'>
            {links.map((linkObj) => (
              <Link
                className={`page-link ${linkColorClasses}`}
                key={linkObj.label}
                href={linkObj.href}
                target={linkObj.target}
              >
                {linkObj.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  )
}

export default SiteHeader
