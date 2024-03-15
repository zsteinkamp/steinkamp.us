export type IFrameProps = {
  className?: string
  title?: string
  src: string
}

const IFrame: React.FC<IFrameProps> = ({ src, title, className }) => {
  return (<iframe src={src} className={`w-full aspect-square ${className}`} title={title} />)
}

export default IFrame