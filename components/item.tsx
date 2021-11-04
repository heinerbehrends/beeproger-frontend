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
  setError: Dispatch<SetStateAction<string>>;
};

export default function ShowEditItem({
  item,
  items,
  setItems,
  setError,
}: DisplayItemProps) {
  return (
    <React.Fragment key={item.id}>
      <Checkbox
        item={item}
        items={items}
        setItems={setItems}
        setError={setError}
      />
      <ItemImage item={item} />
      <Title completed={!!item.isDone}>{item.title}</Title>
      <Flex
        css={{
          height: '60px',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <UploadDialog
          item={item}
          items={items}
          setItems={setItems}
          setError={setError}
        />
        <EditDialog
          item={item}
          setItems={setItems}
          items={items}
          setError={setError}
        />
        <DeleteDialog
          item={item}
          setItems={setItems}
          items={items}
          setError={setError}
        />
      </Flex>
    </React.Fragment>
  );
}
