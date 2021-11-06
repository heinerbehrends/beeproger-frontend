import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Fieldset, Label, TextArea } from './formStyles';
import { selectText } from './titleInput';

type DetailsInputProps = {
  details: string;
  setDetails: Dispatch<SetStateAction<string>>;
};

export default function DetailsInput({
  details,
  setDetails,
}: DetailsInputProps) {
  function updateDetails(event: ChangeEvent<HTMLTextAreaElement>) {
    setDetails(event.target.value);
  }

  return (
    <Fieldset>
      <Label
        css={{ alignSelf: 'flex-start', marginTop: '12px' }}
        htmlFor="details"
      >
        Details
      </Label>
      <TextArea
        as="textarea"
        css={{ height: 'fit-content', lineHeight: 1.5, paddingTop: '10px' }}
        rows={6}
        id="details"
        value={details}
        onFocus={selectText}
        onChange={updateDetails}
      />
    </Fieldset>
  );
}
