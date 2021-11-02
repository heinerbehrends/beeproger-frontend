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
    shadows: {
      outline: `0 0 0 1px $colors$violet7`,
      focus: `0 0 0 2px $colors$violet8`,
    },
  },
});
