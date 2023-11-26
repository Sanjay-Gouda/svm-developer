import { Button, Label } from '@windmill/react-ui';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import { useProjectDetails } from '@/hooks/useProjectDetails';

import ComboBox from '@/components/ComboBox/comboBox';
import UploadSiteImages from '@/components/Projects/uploadSiteImages';

import { httpInstance } from '@/constants/httpInstances';

type selectProjectProps = {
  id?: string;
  name?: string;
};

const initialValues = {
  project: {},
};

const HappyCustomer = () => {
  const projects = useProjectDetails();
  const [customerImages, setCustomerImages] = useState<any>([]);
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
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      addHappyCustomer(values);
    },
  });

  const addHappyCustomer = async (values: any) => {
    const { project } = values;
    const { id } = project;

    const formData = new FormData();
    for (let i = 0; i < customerImages.length; i++) {
      formData.append('customers', customerImages[i]);
    }

    try {
      const res = await httpInstance.put(
        `project/upload/happy-customers/${id}`,
        formData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
            selected={formik.values.project}
            setSelected={(project: selectProjectProps) => {
              formik.setFieldValue('project', project);
            }}
          />
        </div>
        <div>
          <UploadSiteImages
            projectDevelopementImages={customerImages}
            setProjectDevelopementImages={setCustomerImages}
          />
        </div>

        <div className='flex w-full justify-end'>
          <Button size='regular' onClick={() => formik.handleSubmit()}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HappyCustomer;
