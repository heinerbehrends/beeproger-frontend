import { styled } from '../stitchesConfig';

export const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: 'pointer',
  '&:disabled': {
    cursor: 'default',
  },

  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: '$violet11',
        border: '1px solid $colors$violet8',
        boxShadow: '$soft',
        '&:hover': { backgroundColor: '$colors$violet3' },
        '&:focus': { boxShadow: `0 0 0 2px $colors$violet11` },
      },
      green: {
        backgroundColor: '$green4',
        color: '$green11',
        border: '1px solid $colors$green8',
        '&:hover': { backgroundColor: '$green5' },
        '&:focus': { boxShadow: `0 0 0 2px $colors$green7` },
      },
      red: {
        backgroundColor: '$red4',
        color: '$red11',
        border: '1px solid $colors$red8',
        '&:hover': { backgroundColor: '$red5' },
        '&:focus': { boxShadow: `0 0 0 2px $colors$red7` },
      },
      mauve: {
        backgroundColor: '$mauve4',
        color: '$mauve11',
        '&:hover': { backgroundColor: '$mauve5' },
        '&:focus': { boxShadow: `0 0 0 2px $colors$mauve7` },
      },
      disabled: {
        backgroundColor: '$mauve2',
        color: '$mauve8',
        border: '1px solid $mauve5',
      },
      hidden: {
        visibility: 'hidden',
      },
    },
  },
  defaultVariants: {
    variant: 'violet',
  },
});

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$violet11',
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: '$violet4' },
  '&:focus': { boxShadow: `0 0 0 2px $colors$violet7` },
});
