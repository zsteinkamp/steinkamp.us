export function Strava({ className, src }) {
  return (
    <div className={className}>
      <iframe src={src} width="100%" frameBorder="0" scrolling="no" />
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
