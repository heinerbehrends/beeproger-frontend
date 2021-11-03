import React, {
  ChangeEvent,
  FocusEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialogStyles';
import { Item } from '../pages';
import { styled } from '@stitches/react';
import { Button, IconButton } from './buttonStyles';
import { Fieldset, Input, Label, Message, TextArea } from './formStyles';
import { Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';

type DetailsDialogProps = {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
};

export const Flex = styled('div', { display: 'flex' });
export const Box = styled('div', {});

export default function EditDialog({
  item,
  items,
  setItems,
}: DetailsDialogProps) {
  const [title, setTitle] = useState(item.title);
  const [details, setDetails] = useState(item.details);
  const [message, setMessage] = useState('');

  function submitTitleDetails() {
    // validate title length
    if (title.length < 1) {
      return;
    }
    // optimistic ui update
    setItems([
      ...items.map((i) => (i.id !== item.id ? i : { ...item, title, details })),
    ]);
    // request to update db
    fetch(`http://localhost/api/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, details }),
    });
  }
  function updateTitle(event: ChangeEvent<HTMLInputElement>) {
    setMessage('');
    setTitle(event.target.value);
  }
  function updateDetails(event: ChangeEvent<HTMLTextAreaElement>) {
    setDetails(event.target.value);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit the item</Button>
      </DialogTrigger>
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
            onBlur={() => {
              if (title.length < 1) setMessage('Please enter a title');
            }}
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
