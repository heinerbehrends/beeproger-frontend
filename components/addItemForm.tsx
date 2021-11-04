import React, {
  Dispatch,
  FormEvent,
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
      setMessage('Please enter a title');
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
        } else {
          throw new Error('There was a server error. Please try again later.');
        }
      })
      .then((item) => setItems([...items, item]))
      .catch((error) => setError(error.message));
  }

  return (
    <>
      <GridForm onSubmit={handleSubmit}>
        <Input
          ref={input}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setShowAdd(false);
          }}
          onBlur={(event) => {
            if (title.length < 1) {
              setMessage('Please enter a title.');
              event.target.focus();
            }
          }}
          onChange={(event) => {
            setMessage('');
            setTitle(event.target.value);
          }}
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
            <>
              <Button type="submit" variant={'green'}>
                Create
              </Button>
              <Button onClick={() => setShowAdd(false)}>Cancel</Button>
            </>
          )}
        </Flex>
      </GridForm>
    </>
  );
}
