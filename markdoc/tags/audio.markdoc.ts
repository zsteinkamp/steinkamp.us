import Audio from '@/components/Audio'

export const audio = {
  render: Audio,
  attributes: {
    src: { type: String },
    type: { type: String, default: 'audio/wav' },
    className: { type: String },
  },
}
