export function YouTube({ className, src, title, width }) {
  return (
    <div className={className}>
      <iframe
        src={src}
        title={title}
        width={width}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
      <style jsx>
        {`
          iframe {
            aspect-ratio: 16 / 9;
            margin: 2rem 0;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  )
}
