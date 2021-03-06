import React, {
  Dispatch,
  FormEvent,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Item } from '../pages';
import { Button } from './buttonStyles';
import { Flex } from './pageStyles';
import { GridForm, Input, Message } from './formStyles';

type AddItemFormProps = {
  setShowAdd: Dispatch<SetStateAction<boolean>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[] | null>>;
  setError: Dispatch<SetStateAction<string>>;
};
export const maxTitleLength = 48;

export default function AddItemForm({
  setShowAdd,
  items,
  setItems,
  setError,
}: AddItemFormProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const input = useRef<null | HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.length < 1) {
      return;
    } else if (title.length > maxTitleLength) {
      setMessage('Please enter a shorter title');
      return;
    }
    fetch('http://localhost/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        details: 'Add a more detailed description.',
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return response.json().then((response) => {
            throw new Error(response.message);
          });
        } else {
          throw new Error('There was a server error. Please try again later.');
        }
      })
      .then((item) => {
        setItems([...items, item]);
        setError('');
      })
      .catch((error) => setError(error.message));
  }

  function closeOnEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') setShowAdd(false);
  }
  function validateOnBlur(event: FocusEvent<HTMLInputElement>) {
    if (title.length < 1) {
      setMessage('Please enter a title.');
      event.target!.focus();
    } else if (title.length > maxTitleLength) {
      setMessage('Please enter a shorter title.');
      event.target.focus();
    }
  }
  function validateOnChange(event: ChangeEvent<HTMLInputElement>) {
    if (title.length < 1) {
      setMessage('Please enter a title.');
      event.target.focus();
    } else if (title.length > maxTitleLength) {
      setMessage('Please enter a shorter title.');
      event.target.focus();
    }

    if (title.length >= 0 && title.length < maxTitleLength) {
      setMessage('');
    }
    setTitle(event.target.value);
  }
  return (
    <>
      <GridForm onSubmit={handleSubmit}>
        <Input
          ref={input}
          onKeyDown={closeOnEscape}
          onBlur={validateOnBlur}
          onChange={validateOnChange}
          autoFocus
          css={{ alignSelf: 'center', width: '90%' }}
        />
        <Flex
          css={{
            height: '60px',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {message ? (
            <Message>
              <InfoCircledIcon />
              {message}
            </Message>
          ) : (
            <Button type="submit" variant={'green'}>
              Create
            </Button>
          )}
          <Button onClick={() => setShowAdd(false)}>Cancel</Button>
        </Flex>
      </GridForm>
    </>
  );
}
