import React, { Dispatch, SetStateAction, useState } from 'react';
import { Item } from '../pages';

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
  const [details, setDetails] = useState('');
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch('http://localhost/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, details }),
    })
      .then((response) => response.json())
      .then((item) => setItems([...items, item]));
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        maxWidth: '960px',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '1rem',
        padding: '1rem',
      }}
    >
      <input
        type="text"
        name="title"
        aria-label="title"
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        name="details"
        aria-label="details"
        placeholder="Details"
        onChange={(event) => setDetails(event.target.value)}
      />
      <button type="submit">Add item</button>
      <button onClick={() => setShowAdd(false)}>Cancel</button>
    </form>
  );
}
