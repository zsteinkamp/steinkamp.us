import CaptionedImage from '@/components/CaptionedImage'

export const captionedimage = {
  render: CaptionedImage,
  attributes: {
    src: { type: String, required: true },
    alt: { type: String },
    caption: { type: String },
    className: { type: String },
  },
}
