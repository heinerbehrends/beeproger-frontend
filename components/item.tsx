import React, { SetStateAction, Dispatch } from 'react';
import { Item } from '../pages';
import Checkbox from './checkbox';
import EditDialog, { Flex } from './editDialog';
import UploadDialog from './uploadDialog';
import ItemImage from './itemImage';
import { Button } from './buttonStyles';
import Title from './title';

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
  return (
    <React.Fragment key={item.id}>
      <Checkbox item={item} items={items} setItems={setItems} />
      <ItemImage item={item} />
      <Title item={item} />
      <Flex
        css={{
          height: '60px',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <UploadDialog item={item} items={items} setItems={setItems} />

        <EditDialog item={item} setItems={setItems} items={items} />
        <Button
          onClick={() => {
            setItems([...items.filter((i) => i.id !== item.id)]);
            fetch(`http://localhost/api/items/${item.id}`, {
              method: 'DELETE',
            });
          }}
        >
          Delete
        </Button>
      </Flex>
    </React.Fragment>
  );
}
