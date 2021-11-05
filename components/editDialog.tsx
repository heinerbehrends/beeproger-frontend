import React, {
  ChangeEvent,
  FocusEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
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
import { Fieldset, Input, Label, Message, TextArea } from './formStyles';
import { Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Flex } from './pageStyles';
import EditButton from './editDialogButton';
import { maxTitleLength } from './addItemForm';

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
  function updateTitle(event: ChangeEvent<HTMLInputElement>) {
    setMessage('');
    setTitle(event.target.value);
  }
  function updateDetails(event: ChangeEvent<HTMLTextAreaElement>) {
    setDetails(event.target.value);
  }
  function validateTitle() {
    if (title.length < 1) {
      setMessage('Please enter a title.');
    } else if (title.length > maxTitleLength) {
      setMessage('Please enter a shorter title.');
    }
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
        <Fieldset>
          <Label htmlFor="title">Title</Label>
          <Input
            required
            id="title"
            value={title}
            onChange={updateTitle}
            onFocus={(event) => event.target.select()}
            onBlur={validateTitle}
          />
        </Fieldset>
        <Fieldset>
          <Label
            css={{ alignSelf: 'flex-start', marginTop: '12px' }}
            htmlFor="details"
          >
            Details
          </Label>
          <TextArea
            as="textarea"
            css={{ height: 'fit-content', lineHeight: 1.5, paddingTop: '10px' }}
            rows={6}
            id="details"
            value={details}
            onFocus={(event: FocusEvent<HTMLTextAreaElement>) =>
              event.target.select()
            }
            onChange={updateDetails}
          />
        </Fieldset>
        {message ? (
          <Message>
            <InfoCircledIcon />
            {message}
          </Message>
        ) : (
          <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
            <DialogClose asChild onClick={submitTitleDetails}>
              <Button aria-label="Close" variant="green">
                Save changes
              </Button>
            </DialogClose>
          </Flex>
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
