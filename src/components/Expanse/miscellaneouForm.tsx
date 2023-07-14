import { Button } from '@windmill/react-ui';
import React from 'react';

import { TextInput } from '@/components/ui-blocks';

const MiscellaneouForm = ({
  index,
  handleHideForm,
  handleAddFields,
  handleRemoveFields,
  handleChange,
  expanseName,
  cost,
}) => {
  console.log(expanseName);

  return (
    <>
      <div className='flex items-end justify-start gap-3'>
        <TextInput
          type='text'
          name='expanseName'
          onChange={(e) => handleChange(e)}
          value={expanseName}
          label='Expanse Name'
          placeholder='expanse name  '
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

        {index === 0 ? (
          <Button className='' onClick={() => handleHideForm()}>
            -
          </Button>
        ) : (
          <Button className='' onClick={() => handleRemoveFields()}>
            -
          </Button>
        )}
      </div>
    </>
  );
};

export default MiscellaneouForm;
