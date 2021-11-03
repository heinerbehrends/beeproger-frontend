import React, { Dispatch, SetStateAction, useState } from 'react';
import NextImage from 'next/image';
import { Button } from './buttonStyles';
import { Fieldset, Label } from './formStyles';
import { css } from '../stitchesConfig';

type ImageUploadProps = {
  setFoto: Dispatch<SetStateAction<File | null>>;
  foto: File | null;
};

const imageStyles = css({
  objectFit: 'cover',
  borderRadius: '50%',
});

export default function ImageUpload({ setFoto }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <Fieldset>
      <Label>Add an image</Label>
      <Button
        as="label"
        htmlFor="file-upload"
        css={{ '&:focus-within': { boxShadow: '$focus' } }}
      >
        Browse
        <input
          type="file"
          id="file-upload"
          // style={{ display: 'none' }}
          onChange={(event) => {
            setFoto(event.target.files![0]);
            setPreview(URL.createObjectURL(event.target.files![0]));
          }}
        />
      </Button>
      {preview ? (
        <NextImage
          src={preview}
          alt="preview of the selected image"
          width="100"
          height="100"
          className={imageStyles()}
        />
      ) : null}
    </Fieldset>
  );
}
