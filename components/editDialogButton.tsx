import React from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from './buttonStyles';
import { Item } from '../pages';

export default function EditButton({ item }: { item: Item }) {
  return (
    <DialogTrigger asChild>
      <Button
        disabled={!!item.isDone}
        variant={item.isDone ? 'disabled' : 'violet'}
      >
        Edit the item
      </Button>
    </DialogTrigger>
  );
}
