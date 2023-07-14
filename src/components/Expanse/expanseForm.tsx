import { Button, Label } from '@windmill/react-ui';
import React, { useState } from 'react';

import { useProjectDetails } from '@/hooks/useProjectDetails';

import ComboBox from '@/components/ComboBox/comboBox';
import MiscellaneouForm from '@/components/Expanse/miscellaneouForm';
import { TextInput } from '@/components/ui-blocks';

type miscProps = {
  id: number;
  expanseName: string;
  cost: number | undefined;
}[];

const ExpanseForm = () => {
  const [showExapnseForm, setShowExapnseForm] = useState(false);

  const [miscForm, setMiscForm] = useState<miscProps>([
    {
      id: Math.floor(Math.random() * 1000),
      expanseName: '',
      cost: undefined,
    },
  ]);

  const projectList = useProjectDetails();
  const [query, setQuery] = useState('');

  const hadnleSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  const afterLeave = () => {
    setQuery('');
  };

  const filterProjects =
    query === ''
      ? projectList
      : projectList.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleAddFields = () => {
    setMiscForm([
      ...miscForm,
      {
        id: Math.floor(Math.random() * 1000),
        expanseName: '',
        cost: undefined,
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    const remainedForm = miscForm.filter((box) => {
      return box.id !== id;
    });

    setMiscForm(remainedForm);

    if (remainedForm.length === 0) {
      setShowExapnseForm(!showExapnseForm);
    }
  };

  const handleChange = (e, ind) => {
    const { name, value } = e.target;

    console.log(value, ind);
  };
  const handleSubmit = () => {
    console.log(miscForm);
  };

  return (
    <div className='mx-auto flex w-1/3 flex-col gap-2'>
      <div>
        <Label>Project Name</Label>
        <ComboBox
          placeholder='Project Name'
          data={filterProjects}
          query={query}
          afterLeave={afterLeave}
          handleSearchQuery={hadnleSearchQuery}
          //  selected={formik.values.customerName}
        />
      </div>

      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='landPurchase'
          label='Land Purchase'
          placeholder='cost '
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='nonAgriculture'
          label='Non-Agriculture'
          placeholder=' cost '
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='brokrage'
          label='Brokrage'
          placeholder='cost '
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='planningLayout'
          label='Planning & Layout'
          placeholder='cost '
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='landvisit'
          label='Land Visit'
          placeholder='cost '
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='landdevelopement'
          label='Land Developement'
          placeholder='cost '
        />
      </div>

      <div className='flex flex-col gap-2'>
        {showExapnseForm ? (
          <>
            {miscForm?.map((box, ind) => {
              return (
                <MiscellaneouForm
                  index={ind}
                  key={box.id}
                  expanseName={box.expanseName}
                  cost={box.cost}
                  handleHideForm={() => {
                    setShowExapnseForm(false);
                  }}
                  handleChange={(e) => {
                    handleChange(e, ind);
                  }}
                  handleAddFields={handleAddFields}
                  handleRemoveFields={() => {
                    handleRemoveFields(box.id);
                  }}
                />
              );
            })}
          </>
        ) : (
          <Button
            className='my-1'
            layout='outline'
            onClick={() => {
              setShowExapnseForm(true);
            }}
          >
            Add Miscellaneous Exapnse
          </Button>
        )}
      </div>

      <Button className='' onClick={() => handleSubmit()}>
        Submit
      </Button>
    </div>
  );
};

export default ExpanseForm;
