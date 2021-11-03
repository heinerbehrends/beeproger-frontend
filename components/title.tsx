import React from 'react';
import { Item } from '../pages';
import { Flex } from './editDialog';

type TitleProps = {
  item: Item;
};

export default function Title({ item }: TitleProps) {
  return (
    <Flex
      css={{
        textDecoration: item.isDone ? 'line-through' : 'none',
        height: '60px',
        alignItems: 'center',
        fontSize: '18px',
      }}
    >
      {item.title}
    </Flex>
  );
}
