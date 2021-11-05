import { Root, Indicator } from '@radix-ui/react-checkbox';
import { styled } from '../stitchesConfig';

export const StyledCheckbox = styled(Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$outline, $soft',
  cursor: 'pointer',
  '&:focus': { boxShadow: `0 0 0 2px $colors$violet11` },
  '&:hover': { backgroundColor: '$violet3' },
});
export const StyledIndicator = styled(Indicator, {
  color: '$green11',
  '& svg': {
    height: 40,
    width: 40,
  },
});
