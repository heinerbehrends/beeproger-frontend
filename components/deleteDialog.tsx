import React, { useRef } from 'react';
import { Trigger, Cancel, Action } from '@radix-ui/react-alert-dialog';
import { Button } from './buttonStyles';
import { Flex } from './pageStyles';
import { DialogProps } from './editDialog';
import {
  DeleteDialogRoot,
  DeleteDialogContent,
  DeleteDialogDescription,
  DeleteDialogTitle,
} from './deleteDialogStyles';

export default function DeleteDialog({
  setItems,
  items,
  item,
  setError,
}: DialogProps) {
  const itemToRestore = useRef(item);

  function handleDelete() {
    // optimistic ui update
    setItems([...items.filter((i) => i.id !== item.id)]);
    fetch(`http://localhost/api/items/${item.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status !== 200)
          throw new Error('There was a server error. Please try again later.');
      })
      .catch((error) => {
        setError(error.message);
        // undo optimistic ui update
        setItems([...items, itemToRestore.current]);
      });
  }
  return (
    <DeleteDialogRoot>
      <Trigger asChild>
        <Button>Delete item</Button>
      </Trigger>
      <DeleteDialogContent>
        <DeleteDialogTitle>Are you absolutely sure?</DeleteDialogTitle>
        <DeleteDialogDescription>
          This action cannot be undone. This will permanently delete the item
          from our servers.
        </DeleteDialogDescription>
        <Flex css={{ justifyContent: 'flex-end' }}>
          <Cancel asChild>
            <Button variant="mauve" css={{ marginRight: 25 }}>
              Cancel
            </Button>
          </Cancel>
          <Action asChild>
            <Button onClick={handleDelete} variant="red">
              Yes, delete item
            </Button>
          </Action>
        </Flex>
      </DeleteDialogContent>
    </DeleteDialogRoot>
  );
}
