import React, { Dispatch, SetStateAction, useState } from 'react';
import { Root, Indicator, CheckedState } from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Item } from '../pages';
import { styled } from '@stitches/react';
import { DialogProps } from './editDialog';

type CheckboxProps = {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
};

export const StyledCheckbox = styled(Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$outline, $soft',
  cursor: 'pointer',
  '&:focus': { boxShadow: `0 0 0 2px $colors$violet11` },
  '&:hover': { backgroundColor: '$violet3' },
});
const StyledIndicator = styled(Indicator, {
  color: '$green11',
  '& svg': {
    height: 40,
    width: 40,
  },
});

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
