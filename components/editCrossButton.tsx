import { DialogClose } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { IconButton } from './buttonStyles';

export default function EditCrossButton() {
  return (
    <DialogClose asChild>
      <IconButton>
        <Cross2Icon />
      </IconButton>
    </DialogClose>
  );
}
