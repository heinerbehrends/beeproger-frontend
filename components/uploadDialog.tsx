import React, { Dispatch, SetStateAction, useState } from 'react';
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
import ImageUpload from './imageUpload';
import { Cross2Icon } from '@radix-ui/react-icons';

type DetailsDialogProps = {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
};

export const Flex = styled('div', { display: 'flex' });
export const Box = styled('div', {});

export default function UploadDialog({
  item,
  items,
  setItems,
}: DetailsDialogProps) {
  const [foto, setFoto] = useState<File | null>(null);

  function submitImage() {
    const formData = new FormData();
    if (foto === null) {
      // set error message
      return;
    }
    formData.append('foto', foto);
    formData.append('_method', 'PATCH');

    fetch(`http://localhost/api/items/${item.id}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((item) =>
        setItems([...items.map((i) => (i.id === item.id ? item : i))])
      );
  }

  return (
    <Flex css={{ justifyContent: 'flex-end' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload an image</Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Upload an image</DialogTitle>
          <DialogDescription>
            Browse your local computer to upload an image. Click save when
            you&apos;re done.
          </DialogDescription>
          <ImageUpload foto={foto} setFoto={setFoto} />
          <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
            <DialogClose asChild tabIndex={0} onClick={submitImage}>
              <Button aria-label="Close" variant="green">
                Save changes
              </Button>
            </DialogClose>
          </Flex>
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
