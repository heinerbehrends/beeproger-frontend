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
  gridTemplateColumns: '1fr 1fr 3fr 6fr',
  paddingLeft: '16px',
  gridGap: '1rem',
});
