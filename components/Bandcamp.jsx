export function Bandcamp({ className, src }) {
  return (
    <div className={className}>
      <iframe src={src} frameBorder="0" />
      <style jsx>
        {`
          iframe {
            height: 120px;
            width: 100%;
            margin: 2rem 0;
            border-radius: 4px;
            @apply dark:bg-stone-900;
          }
        `}
      </style>
    </div>
  )
}
