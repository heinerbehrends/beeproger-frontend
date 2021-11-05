import React, { Dispatch, SetStateAction } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Item } from '../pages';
import { DialogProps } from './editDialog';
import { StyledCheckbox, StyledIndicator } from './checkboxStyles';

type CheckboxProps = {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
};

export default function Checkbox({
  item,
  items,
  setItems,
  setError,
}: DialogProps) {
  function handleCheckChange(checked: CheckedState) {
    // optimistic ui update
    setItems([
      ...items.map((i) =>
        i.id !== item.id ? i : { ...item, isDone: checked === true ? 1 : 0 }
      ),
    ]);
    // request for database update
    fetch(`http://localhost/api/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone: checked ? 1 : 0 }),
    })
      .then((request) => {
        if (request.status !== 200) {
          throw new Error('There was a server error. Please try again later.');
        }
      })
      .catch((error) => setError(error.message));
  }

  return (
    <StyledCheckbox
      checked={item.isDone === 0 || false ? false : true}
      onCheckedChange={handleCheckChange}
    >
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledCheckbox>
  );
}
