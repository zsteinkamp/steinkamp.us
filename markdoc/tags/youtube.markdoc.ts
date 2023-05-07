import { YouTube } from '../../components/YouTube'

export const youtube = {
  render: YouTube,
  attributes: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    className: {
      type: String,
    },
  },
}
