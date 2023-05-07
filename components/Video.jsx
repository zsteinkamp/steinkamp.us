const Video = ({
  src,
  type = 'video/mp4',
  autoPlay = false,
  loop = false,
  className,
}) => {
  return (
    <div className={className}>
      <video autoPlay={autoPlay} loop={loop} controls>
        <source src={src} type={type} />
      </video>
      <style jsx>
        {`
          video {
            margin: 2rem 0;
            max-width: 100%;
            max-height: 75vh;
          }
        `}
      </style>
    </div>
  )
}

export default Video
