import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Item } from '../pages';
import { Button } from './buttonStyles';
import { StyledCheckbox } from './checkbox';
import { Flex } from './editDialog';
import { ImageContainer } from './itemImage';
import { GridForm, Input } from './formStyles';
import { ImageIcon } from '@radix-ui/react-icons';

type AddItemFormProps = {
  setShowAdd: Dispatch<SetStateAction<boolean>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
};

export default function AddItemForm({
  setShowAdd,
  items,
  setItems,
}: AddItemFormProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch('http://localhost/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        details: 'Add a more detailed description',
      }),
    })
      .then((response) => response.json())
      .then((item) => setItems([...items, item]));
  }

  return (
    <GridForm onSubmit={handleSubmit}>
      <StyledCheckbox />
      <ImageContainer>
        <ImageIcon />
      </ImageContainer>
      <Input
        onKeyDown={(event) => {
          if (event.key === 'Escape') setShowAdd(false);
        }}
        onChange={(event) => setTitle(event.target.value)}
        autoFocus
        css={{ alignSelf: 'center', width: '85%' }}
      />
      <Flex
        css={{
          height: '60px',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Button type="submit" variant={'green'}>
          Create
        </Button>
        <Button onClick={() => setShowAdd(false)}>Cancel</Button>
      </Flex>
    </GridForm>
  );
}
