import { Image } from 'next/image'

const CaptionedImage = ({ src, alt, caption, className }) => {
  return (
    <figure className={`mb-8 ${className}`}>
      <img alt={alt} src={src} />
      <figcaption className="italic text-sm">{caption}</figcaption>
    </figure>
  )
}

export default CaptionedImage
