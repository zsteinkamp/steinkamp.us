export type IFrameProps = {
  className?: string
  title?: string
  src: string
}

const IFrame: React.FC<IFrameProps> = ({ src, title, className }) => {
  return (
    <iframe
      src={src}
      className={`aspect-square w-full ${className}`}
      title={title}
    />
  )
}

export default IFrame
