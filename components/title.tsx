import React from 'react';
import { Item } from '../pages';
import { styled } from '../stitchesConfig';
import { Flex } from './pageStyles';

type TitleProps = {
  item: Item;
};

const Title = styled(Flex, {
  height: '60px',
  alignItems: 'center',
  fontSize: '18px',

  variants: {
    completed: {
      true: {
        textDecoration: 'line-through',
      },
    },
  },
});

export default Title;
// export default function Title({ item }: TitleProps) {
//   return (
//     <Flex
//       css={{
//         textDecoration: item.isDone ? 'line-through' : 'none',
//         height: '60px',
//         alignItems: 'center',
//         fontSize: '18px',
//       }}
//     >
//       {item.title}
//     </Flex>
//   );
// }
