import {
  Content,
  Description,
  Overlay,
  Root,
  Title,
} from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';
import { styled } from '../stitchesConfig';
import {
  overlayStyles,
  contentStyles,
  titleStyles,
  descriptionStyles,
} from './dialogStyles';

const StyledOverlay = styled(Overlay, overlayStyles);

export function DeleteDialogRoot({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  return (
    <Root {...props}>
      <StyledOverlay />
      {children}
    </Root>
  );
}

export const DeleteDialogContent = styled(Content, contentStyles);
export const DeleteDialogTitle = styled(Title, titleStyles);
export const DeleteDialogDescription = styled(Description, descriptionStyles);
