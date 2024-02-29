import Link from 'next/link'

const BackButton = ({ label = '<<< Back', className }) => {
  return (
    <Link href='/' className={className}>
      {label}
    </Link>
  )
}

export default BackButton
