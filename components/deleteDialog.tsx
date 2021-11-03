import React, { ReactNode } from 'react';
import {
  Root,
  Overlay,
  Trigger,
  Content,
  Title,
  Description,
  Cancel,
  Action,
} from '@radix-ui/react-alert-dialog';
import {
  overlayStyles,
  contentStyles,
  titleStyles,
  descriptionStyles,
} from './dialogStyles';
import { styled } from '../stitchesConfig';
import { Button } from './buttonStyles';
import { Flex } from './pageStyles';
import { DialogProps } from './editDialog';

const StyledOverlay = styled(Overlay, overlayStyles);

function Dialog({ children, ...props }: { children: ReactNode }) {
  return (
    <Root {...props}>
      <StyledOverlay />
      {children}
    </Root>
  );
}

const DialogContent = styled(Content, contentStyles);
const DialogTitle = styled(Title, titleStyles);
const DialogDescription = styled(Description, descriptionStyles);

export default function DeleteDialog({ setItems, items, item }: DialogProps) {
  return (
    <Dialog>
      <Trigger asChild>
        <Button>Delete item</Button>
      </Trigger>
      <DialogContent>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the item
          from our servers.
        </DialogDescription>
        <Flex css={{ justifyContent: 'flex-end' }}>
          <Cancel asChild>
            <Button variant="mauve" css={{ marginRight: 25 }}>
              Cancel
            </Button>
          </Cancel>
          <Action asChild>
            <Button
              onClick={() => {
                setItems([...items.filter((i) => i.id !== item.id)]);
                fetch(`http://localhost/api/items/${item.id}`, {
                  method: 'DELETE',
                });
              }}
              variant="red"
            >
              Yes, delete item
            </Button>
          </Action>
        </Flex>
      </DialogContent>
    </Dialog>
  );
}
