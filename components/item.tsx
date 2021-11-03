import React, { SetStateAction, Dispatch } from 'react';
import { Item } from '../pages';
import Checkbox from './checkbox';
import EditDialog from './editDialog';
import UploadDialog from './uploadDialog';
import DeleteDialog from './deleteDialog';
import { Flex } from './pageStyles';
import ItemImage from './itemImage';
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
        <DeleteDialog item={item} setItems={setItems} items={items} />
      </Flex>
    </React.Fragment>
  );
}
