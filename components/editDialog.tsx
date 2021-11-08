import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './dialogStyles';
import { Item } from '../pages';
import { Message } from './formStyles';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import EditButton from './editDialogButton';
import DetailsInput from './detailsInput';
import TitleInput from './titleInput';
import EditSaveButton from './editSaveButton';
import EditCrossButton from './editCrossButton';

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
  const oldTitleDetails = useRef({ title: item.title, details: item.details });

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
      .catch((error) => {
        setError(error.message);
        // unset optimistic-ui update
        const oldTitle = oldTitleDetails.current.title;
        const oldDetails = oldTitleDetails.current.details;
        console.log(oldTitle);
        setTitle(oldTitle);
        setDetails(oldDetails);
        setItems([
          ...items.map((i) =>
            i.id !== item.id ? i : { ...item, title, details }
          ),
        ]);
      });
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
          <EditSaveButton submitFunction={submitTitleDetails} />
        )}
        <EditCrossButton />
      </DialogContent>
    </Dialog>
  );
}
