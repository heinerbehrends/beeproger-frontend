import {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
import { keyframes, styled } from '@stitches/react';
import { ReactNode } from 'react';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(Overlay, {
  backgroundColor: '$blackA9',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

function DialogRoot({ children, ...props }: { children: ReactNode }) {
  return (
    <Root {...props}>
      <StyledOverlay />
      {children}
    </Root>
  );
}

const StyledContent = styled(Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform',
  },
  '&:focus': { outline: 'none' },
});

const StyledTitle = styled(Title, {
  margin: 0,
  fontWeight: 500,
  color: 'black',
  fontSize: 17,
});

const StyledDescription = styled(Description, {
  margin: '10px 0 20px',
  color: 'black',
  fontSize: 15,
  lineHeight: 1.5,
});

export const Dialog = DialogRoot;
export const DialogTrigger = Trigger;
export const DialogOverlay = StyledOverlay;
export const DialogContent = StyledContent;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = Close;
