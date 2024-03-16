const CaptionedImage = ({ src, alt, caption, className = '' }) => {
  return (
    <figure className={`mb-8 ${className}`}>
      <a href={src}>
        <img alt={alt || src} src={src} />
        <figcaption className='text-sm italic'>{caption}</figcaption>
      </a>
    </figure>
  )
}

export default CaptionedImage
