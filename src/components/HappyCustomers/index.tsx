import { Button, Label } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

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
  const [loading, setLoading] = useState(false);
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

  const handleSearchQuery = (e: any) => {
    setQuery(e.target.value);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (isEmpty(values.project)) {
        toast.info('Please Select Project');
      } else if (customerImages?.length === 0) {
        toast.info('Please Upload Images');
      } else {
        addHappyCustomer(values);
      }
    },
  });

  const addHappyCustomer = async (values: any) => {
    setLoading(true);
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
      setLoading(false);
      // console.log(res?.data?.message);
      toast.success(res.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
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
            handleSearchQuery={handleSearchQuery}
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
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HappyCustomer;
