import { useRouter } from 'next/router'
import Link from 'next/link'

const BackButton = ({ label = '<<< Back', className }) => {
  const router = useRouter()

  return (
    <Link href="/" className={className}>
      {label}
    </Link>
  )
}

export default BackButton
