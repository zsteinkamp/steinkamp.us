import IFrame from "@/components/IFrame"

export const iframe = {
  render: IFrame,
  attributes: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    className: {
      type: String,
    },
  },
}
