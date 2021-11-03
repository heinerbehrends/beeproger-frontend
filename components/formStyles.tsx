import { styled, css } from '../stitchesConfig';

export const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
});

export const Label = styled('label', {
  fontSize: 15,
  color: '$violet11',
  width: 90,
  textAlign: 'right',
});

const InputStyles = css({
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '4px 16px',
  fontSize: 15,
  lineHeight: 1,
  color: '$violet11',
  boxShadow: '$outline',
  height: 35,

  '&:focus': { boxShadow: '$focus' },
});

export const Input = styled('input', InputStyles);
export const TextArea = styled('textarea', InputStyles);

export const GridForm = styled('form', {
  display: 'grid',
  gridTemplateColumns: '5fr 6fr',
  gridGap: '48px',
  paddingBottom: '4rem',
  marginTop: '1rem',
});

export const Message = styled('span', {
  alignSelf: 'center',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '$orange3',
  padding: '8px 32px',
  borderRadius: '4px',
  border: '1px solid $colors$orange11',
  '& svg': {
    paddingRight: '8px',
    height: 25,
    width: 25,
  },
});
