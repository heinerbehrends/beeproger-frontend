import React, { SetStateAction, Dispatch } from 'react';
import { useState } from 'react';
import { Item } from '../pages';

type DisplayItemProps = {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
};

export default function DisplayItem({
  item,
  items,
  setItems,
}: DisplayItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div
        style={{
          display: 'grid',
          maxWidth: '960px',
          gridTemplateColumns: '1fr 3fr 2fr 2fr',
          padding: '1rem',
        }}
        key={item.id}
      >
        <input
          type="checkbox"
          checked={item.isDone}
          onChange={() => {
            item.isDone = !item.isDone;
            setItems([...items.map((i) => (i.id !== item.id ? i : item))]);
            fetch(`http://localhost/api/items/${item.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ isDone: item.isDone ? '1' : '0' }),
            });
          }}
        />
        <div style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}>
          {item.title}
        </div>
        <button
          style={{ width: '100px' }}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'} details
        </button>
        <button
          style={{ width: '100px' }}
          onClick={() => {
            setItems([...items.filter((i) => i.id !== item.id)]);
            fetch(`http://localhost/api/items/${item.id}`, {
              method: 'DELETE',
            });
          }}
        >
          Delete
        </button>
      </div>
      <div
        style={{
          maxHeight: showDetails ? '18px' : '0px',
          transition: 'max-height 0.25s ease-in',
          overflow: 'hidden',
          paddingLeft: '1rem',
        }}
      >
        Details: {item.details}
      </div>
    </>
  );
}
