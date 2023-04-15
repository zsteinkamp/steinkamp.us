import { Each } from '@/components/Each';

export const each = {
  render: Each,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    over: { type: Array, required: true, errorLevel: 'critical' },
    varName: { type: String, required: true, errorLevel: 'critical' },
  },
};
