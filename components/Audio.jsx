const Audio = ({ src, type, className }) => {
  return (
    <div className={className}>
      <audio controls>
        <source src={src} type={type || 'audio/mpeg'} />
      </audio>
      <style jsx>
        {`
          audio {
            margin: 2rem 0;
            width: 100%;
          }
        `}
      </style>
    </div>
  )
}

export default Audio
