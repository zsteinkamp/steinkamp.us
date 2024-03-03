// ./components/SiteHeader.jsx
import Link from 'next/link'

const SiteFooter = () => {
  return (
    <footer className='noprint mt-12 flex items-center justify-between pl-8 pr-8 pb-4 pt-4 font-header'>
      <div>
        Check this{' '}
        <Link href='https://github.com/zsteinkamp/steinkamp.us'>
          code out on GitHub
        </Link>
        .
      </div>
      <div>
        by <Link href='/resume'>Zack Steinkamp</Link>
      </div>
    </footer>
  )
}

export default SiteFooter
