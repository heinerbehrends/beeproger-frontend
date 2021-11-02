import React, { SetStateAction, Dispatch, FormEvent } from 'react';
import { useState } from 'react';
import { Item } from '../pages';
import Checkbox from './checkbox';
import ItemImage from './itemImage';

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
    return (event: FormEvent<HTMLFormElement>) => {
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
          gridTemplateColumns: '1fr 40px 3fr 2fr 2fr 2fr',
          padding: '1rem',
        }}
        key={item.id}
      >
        <ItemImage item={item} />
        <Checkbox item={item} items={items} setItems={setItems} />
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
