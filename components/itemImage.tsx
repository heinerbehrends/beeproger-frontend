import React from 'react';
import NextImage from 'next/image';
import { Item } from '../pages';
import { ImageIcon } from '@radix-ui/react-icons';
import { styled, css } from '@stitches/react';

const imageStyles = css({
  borderRadius: '50%',
});

const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  position: 'relative',
  '& svg': {
    width: 40,
    height: 40,
    color: 'gray',
  },
});

export default function ItemImage({ item }: { item: Item }) {
  return (
    <ImageContainer>
      {item.foto ? (
        <NextImage
          src={`http://localhost/${item.foto}`}
          alt={`foto for ${item.title}`}
          width={60}
          height={60}
          objectFit="cover"
          className={imageStyles()}
        ></NextImage>
      ) : (
        <ImageIcon />
      )}
    </ImageContainer>
  );
}
