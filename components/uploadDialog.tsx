import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialogStyles';
import { Button, IconButton } from './buttonStyles';
import ImageUpload from './imageUpload';
import { Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Message } from './formStyles';
import { Flex } from './pageStyles';
import { DialogProps } from './editDialog';

export default function UploadDialog({
  item,
  items,
  setItems,
  setError,
}: DialogProps) {
  const [foto, setFoto] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  function submitImage() {
    const formData = new FormData();
    if (foto === null) {
      return;
    }
    formData.append('foto', foto);
    formData.append('_method', 'PATCH');

    fetch(`http://localhost/api/items/${item.id}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('There was a server error. Please try again later.');
        }
      })
      .then((item) =>
        setItems([...items.map((i) => (i.id === item.id ? item : i))])
      )
      .catch((error) => setError(error.message));
  }

  return (
    <Flex css={{ justifyContent: 'flex-end' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={!!item.isDone}
            variant={item.isDone ? 'disabled' : 'violet'}
          >
            {item.foto ? 'Change the image' : 'Upload an image'}
          </Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Upload an image</DialogTitle>
          <DialogDescription>
            Browse your local computer to upload an image. Click save when
            you&apos;re done.
          </DialogDescription>
          <ImageUpload setMessage={setMessage} setFoto={setFoto} />
          {message ? (
            <Message>
              <InfoCircledIcon />
              {message}
            </Message>
          ) : (
            <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
              <DialogClose asChild tabIndex={0} onClick={submitImage}>
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
    </Flex>
  );
}
