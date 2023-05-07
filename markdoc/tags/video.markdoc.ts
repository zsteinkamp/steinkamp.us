import Video from '@/components/Video'

export const video = {
  render: Video,
  attributes: {
    src: { type: String },
    autoPlay: { type: Boolean, default: false },
    loop: { type: Boolean, default: false },
    type: { type: String, default: 'audio/mpeg' },
    className: { type: String },
  },
}
