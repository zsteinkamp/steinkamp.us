import { Strava } from '../../components/Strava';

export const strava = {
  render: Strava,
  attributes: {
    src: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  }
};
