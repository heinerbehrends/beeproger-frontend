import React, { Dispatch, SetStateAction } from 'react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import {
  ExclamationTriangleIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { styled } from '../stitchesConfig';

export const ErrorMessageContainer = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '$red4',
  padding: '1rem 4rem',
  borderRadius: '4px',
  marginTop: '16px',
  marginBottom: '16px',
  '& svg': {
    width: 25,
    height: 25,
    marginRight: '8px',
  },
});

const CloseErrorMessageButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  marginLeft: '8px',
  borderRadius: '50%',
  width: '25px',
  height: '25px',
  '&:focus': {
    boxShadow: '$focus',
  },
});

type ErrorMessageProps = {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

export default function ErrorMessage({ error, setError }: ErrorMessageProps) {
  return (
    <ErrorMessageContainer>
      <ExclamationTriangleIcon />
      {error}
      <CloseErrorMessageButton onClick={() => setError('')}>
        <AccessibleIcon label="close the message">
          <CrossCircledIcon />
        </AccessibleIcon>
      </CloseErrorMessageButton>
    </ErrorMessageContainer>
  );
}
