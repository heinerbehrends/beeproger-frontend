import { violet, green, mauve, blackA } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const { styled, css } = createStitches({
  theme: {
    colors: {
      ...violet,
      ...green,
      ...mauve,
      ...blackA,
    },
  },
});
