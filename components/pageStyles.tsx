import { styled } from '../stitchesConfig';

export const ItemsContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 3fr 6fr',
  columnGap: '1rem',
  rowGap: '2rem',
  marginTop: '2rem',
});
export const Container = styled('div', {
  margin: '0 auto',
  maxWidth: '960px',
});
export const Heading = styled('h1', {
  margin: 0,
  marginTop: '2rem',
  textAlign: 'center',
});
export const Flex = styled('div', {
  display: 'flex',
});
export const ButtonContainer = styled(Flex, {
  marginTop: 25,
  justifyContent: 'flex-end',
});
