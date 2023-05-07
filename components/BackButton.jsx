import { useRouter } from 'next/router'

const BackButton = ({ label = '<<< Back', className }) => {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      {label}
    </button>
  )
}

export default BackButton
