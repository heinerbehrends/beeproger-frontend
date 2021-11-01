import React, { SetStateAction, Dispatch } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Item } from '../pages';

type DisplayItemProps = {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
};

export default function ShowEditItem({
  item,
  items,
  setItems,
}: DisplayItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);

  function submitImage(id: number) {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData();
      if (foto === null) {
        // set error message
        return;
      }
      formData.append('foto', foto);
      formData.append('_method', 'PATCH');

      fetch(`http://localhost/api/items/${id}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((item) =>
          setItems([...items.map((i) => (i.id === item.id ? item : i))])
        );
    };
  }
  return (
    <>
      <div
        style={{
          display: 'grid',
          maxWidth: '960px',
          gridTemplateColumns: '1fr 1fr 3fr 2fr 2fr 2fr',
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
        <Image
          src={`http://localhost/${item.foto}`}
          alt={`foto for ${item.title}`}
          width={40}
          height={40}
        />
        <div style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}>
          {item.title}
        </div>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={submitImage(item.id)}
        >
          <div>
            <label htmlFor="file">Add an image</label>
            <input
              type="file"
              id="file"
              name="file"
              multiple
              onChange={(event) => setFoto(event.target.files![0])}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>

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
        {item.details}
      </div>
    </>
  );
}
