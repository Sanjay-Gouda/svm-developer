import { Button, Label } from '@windmill/react-ui';
import React, { useState } from 'react';

import { useProjectDetails } from '@/hooks/useProjectDetails';

import ComboBox from '@/components/ComboBox/comboBox';
import UploadSiteImages from '@/components/Projects/uploadSiteImages';

const HappyCustomer = () => {
  const projects = useProjectDetails();
  const [customerImages, setCustomerImages] = useState([]);
  const [query, setQuery] = useState('');

  const filterProjects =
    query === ''
      ? projects
      : projects.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const afterLeave = () => {
    setQuery('');
  };

  const hadnleSearchQuery = (e: any) => {
    setQuery(e.target.value);
  };
  return (
    <div className='mx-auto flex w-full flex-col '>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <Label className='text-lg text-gray-900 dark:text-gray-300 '>
            Select Project
          </Label>

          <ComboBox
            placeholder='Projects'
            data={filterProjects}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
          />
        </div>
        <div>
          <UploadSiteImages
            projectDevelopementImages={customerImages}
            setProjectDevelopementImages={setCustomerImages}
          />
        </div>

        <div className='flex w-full justify-end'>
          <Button size='regular'>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default HappyCustomer;
