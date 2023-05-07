import PostIndex from '../../components/PostIndex'

export const postindex = {
  render: PostIndex,
  attributes: {
    indexPath: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
  },
}
