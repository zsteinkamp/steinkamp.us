import { Bandcamp } from "@/components/Bandcamp";

export const bandcamp = {
  render: Bandcamp,
  attributes: {
    src: { type: String, required: true },
    className: { type: String },
  },
};
