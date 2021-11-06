import React, {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
} from 'react';
import { maxTitleLength } from './addItemForm';
import { Fieldset, Label, Input } from './formStyles';

type EditInputProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
};

export function selectText(
  event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>
) {
  event.target.select();
}

export default function TitleInput({
  title,
  setTitle,
  setMessage,
}: EditInputProps) {
  function updateTitle(event: ChangeEvent<HTMLInputElement>) {
    setMessage('');
    setTitle(event.target.value);
  }
  function validateTitle() {
    if (title.length < 1) {
      setMessage('Please enter a title.');
    } else if (title.length > maxTitleLength) {
      setMessage('Please enter a shorter title.');
    }
  }
  return (
    <Fieldset>
      <Label htmlFor="title">Title</Label>
      <Input
        required
        id="title"
        value={title}
        onChange={updateTitle}
        onFocus={selectText}
        onBlur={validateTitle}
      />
    </Fieldset>
  );
}
