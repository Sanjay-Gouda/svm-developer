import { Button } from '@windmill/react-ui';
import React from 'react';

import { TextInput } from '@/components/ui-blocks';

type formProps = {
  index: number;
  handleHideForm: () => void;
  handleAddFields: () => void;
  handleRemoveFields: () => void;
  handleChange: (e: any) => void;
  expanse: string | undefined;
  cost: number | undefined;
};

const MiscellaneouForm = ({
  index,
  handleHideForm,
  handleAddFields,
  handleRemoveFields,
  handleChange,
  expanse,
  cost,
}: formProps) => {
  // console.log(expanseName);

  return (
    <>
      <div className='flex items-end justify-start gap-3'>
        <TextInput
          type='text'
          name='expenseName'
          onChange={(e) => handleChange(e)}
          value={expanse}
          label='Expense Name'
          placeholder='expense name'
          className='w-[50%]'
        />
        <TextInput
          type='text'
          name='cost'
          value={cost}
          label='Cost'
          onChange={(e) => handleChange(e)}
          placeholder='cost '
          className='w-[40%]'
        />
        <Button className='' onClick={() => handleAddFields()}>
          +
        </Button>

        <Button className='' onClick={() => handleRemoveFields()}>
          -
        </Button>
      </div>
    </>
  );
};

export default MiscellaneouForm;
