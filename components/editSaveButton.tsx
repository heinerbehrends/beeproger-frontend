import React from 'react';
import { Button } from './buttonStyles';
import { DialogClose } from './dialogStyles';
import { ButtonContainer } from './pageStyles';

type DialogCloseButtonProps = {
  submitFunction: () => void;
};

export default function EditSaveButton({
  submitFunction,
}: DialogCloseButtonProps) {
  return (
    <ButtonContainer>
      <DialogClose asChild onClick={submitFunction}>
        <Button aria-label="Close" variant="green">
          Save changes
        </Button>
      </DialogClose>
    </ButtonContainer>
  );
}
