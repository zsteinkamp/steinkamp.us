import { StravaRoute } from '../../components/StravaRoute'

export const stravaRoute = {
  render: StravaRoute,
  attributes: {
    routeSrc: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
  },
}
