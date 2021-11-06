import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialogStyles';
import { Item } from '../pages';
import { Button, IconButton } from './buttonStyles';
import { Message } from './formStyles';
import { Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';
import { ButtonContainer } from './pageStyles';
import EditButton from './editDialogButton';
import DetailsInput from './detailsInput';
import TitleInput from './titleInput';

export type DialogProps = {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
  setError: Dispatch<SetStateAction<string>>;
};

export default function EditDialog({
  item,
  items,
  setItems,
  setError,
}: DialogProps) {
  const [title, setTitle] = useState(item.title);
  const [details, setDetails] = useState(item.details);
  const [message, setMessage] = useState('');

  function submitTitleDetails() {
    if (title.length < 1) {
      return;
    }
    // optimistic ui update
    setItems([
      ...items.map((i) => (i.id !== item.id ? i : { ...item, title, details })),
    ]);
    fetch(`http://localhost/api/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, details }),
    })
      .then((response) => {
        if (response.status !== 200)
          throw new Error('There was a server error. Please try again later.');
      })
      .catch((error) => setError(error.message));
  }
  return (
    <Dialog>
      <EditButton item={item} />
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Edit the item</DialogTitle>
        <DialogDescription>
          Make changes to the item and upload an image. Click save when
          you&apos;re done.
        </DialogDescription>
        <TitleInput title={title} setTitle={setTitle} setMessage={setMessage} />
        <DetailsInput details={details} setDetails={setDetails} />
        {message ? (
          <Message>
            <InfoCircledIcon />
            {message}
          </Message>
        ) : (
          <ButtonContainer>
            <DialogClose asChild onClick={submitTitleDetails}>
              <Button aria-label="Close" variant="green">
                Save changes
              </Button>
            </DialogClose>
          </ButtonContainer>
        )}
        <DialogClose asChild>
          <IconButton>
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
