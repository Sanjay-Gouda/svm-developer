import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';
import { ProjectFormTypes } from '@/pages/admin/realEstateProjects/add';
import { Button } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type formProps = {
  onComplete: (type: ProjectFormTypes) => void;
};

interface projectDetailProps {
  projectName: string;
  ownerName: string;
  parentProject: string;
  area: number | undefined | string;
  pincode: number | undefined;
  state: string;
  dist: string;
  projectStatus: string;
  address1?: string | undefined;
  address2?: string | undefined;
  desc?: string | undefined;
}

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project Name is required'),
  // parentProject: Yup.string().required('Parent Project is required'),
  // status: Yup.string().required('status is required'),
  ownerName: Yup.string().required('Owner Name is required'),
  area: Yup.number().required('Area must be in number'),
  // projectStatus: Yup.string().required('Project Status is required'),
  pincode: Yup.number().required('Pincode is required'),
  state: Yup.string().required('state is required'),
  dist: Yup.string().required('district is required'),
  address1: Yup.string().required('address is required'),
});

const Status = ['Pending', 'In-Progress', 'Completed'];
const ParentProjects = ['pp1', 'pp2', 'pp3'];

function AddProjectForm({ onComplete }: formProps) {
  const [projectDetails, setProjectDetails] = useState<any>([]);
  // const [isAreaOpen, setAreaOpen] = useState<boolean>(false);

  // const handleAreaDropDown = () => {
  //   setAreaOpen(!isAreaOpen);
  // };

  const handleForm = () => {
    console.log('called', Object.keys(formik.errors));
    formik.handleSubmit();

    // if (Object.keys(formik.errors).length === 0) {
    //   onComplete('image');
    // }
  };

  const formik = useFormik({
    initialValues: {
      projectName: '',
      ownerName: '',
      parentProject: 'none',
      projectStatus: 'upcomming',
      area: undefined,
      pincode: undefined,
      state: '',
      dist: '',
      address1: '',
      address2: '',
      desc: '',
    },
    validationSchema,
    onSubmit: (values: projectDetailProps, { setSubmitting }) => {
      console.log(values, 'called');
      // onComplete('image');
      setProjectDetails(values);

      setSubmitting(false);
    },
  });

  useEffect(() => {
    console.log(projectDetails);
  }, []);

  return (
    <div className='mx-auto  flex w-1/2 flex-col gap-2'>
      <TextInput
        onChange={formik.handleChange}
        value={formik.values.projectName}
        name='projectName'
        containerClassName='flex-1'
        label='Project Name'
        // valid={errors.projectName && touched.projectName}
      />

      {formik.touched.projectName && formik.errors.projectName && (
        <div className='text-red-400'>{formik.errors.projectName}</div>
      )}

      <TextInput
        onChange={formik.handleChange}
        value={formik.values.ownerName}
        name='ownerName'
        containerClassName=' flex-1'
        label='Projects Owner'
      />

      {formik.touched.ownerName && formik.errors.ownerName && (
        <div className='text-red-400'>{formik.errors.ownerName}</div>
      )}
      <SelectOption
        onChange={formik.handleChange}
        title='Parent Project'
        options={ParentProjects}
        containerClassName='flex-1 mt-1 w-full'
        name='parentProject'
      />

      <div className='flex w-full items-center justify-between gap-4'>
        <div className='flex w-1/2 flex-col'>
          <TextInput
            onChange={formik.handleChange}
            value={formik.values.area}
            name='area'
            containerClassName='w-full'
            label='Area'
          />
          {formik.touched.area && formik.errors.area && (
            <div className='text-red-400'>{formik.errors.area}</div>
          )}
        </div>
        <div className='w-1/2'>
          <SelectOption
            onChange={formik.handleChange}
            title='Project Status'
            options={Status}
            containerClassName='mt-1'
            labelClassName='w-full'
            name='projectStatus'
          />
        </div>
      </div>

      <div className='flex w-full  gap-4'>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={formik.handleChange}
            value={formik.values.pincode}
            name='pincode'
            containerClassName='w-full'
            label='PinCode'
          />
          {formik.touched.pincode && formik.errors.pincode && (
            <div className='text-red-400'>{formik.errors.pincode}</div>
          )}
        </div>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={formik.handleChange}
            value={formik.values.dist}
            name='dist'
            containerClassName=' w-full'
            label='District'
          />
          {formik.touched.dist && formik.errors.dist && (
            <div className='text-red-400'>{formik.errors.dist}</div>
          )}
        </div>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={formik.handleChange}
            value={formik.values.state}
            name='state'
            containerClassName=' w-full'
            label='State'
          />
          {formik.touched.state && formik.errors.state && (
            <div className='text-red-400'>{formik.errors.state}</div>
          )}
        </div>
      </div>

      <TextInputArea
        value={formik.values.address1}
        name='address1'
        containerClassName='flex-1 '
        label='Address 1'
        rows='1'
        handleChange={formik.handleChange}
      />
      {formik.touched.address1 && formik.errors.address1 && (
        <div className='text-red-400'>{formik.errors.address1}</div>
      )}
      <TextInputArea
        value={formik.values.address2}
        name='address2'
        containerClassName='flex-1 '
        label='Address 2'
        rows='1'
        handleChange={formik.handleChange}
      />

      <TextInputArea
        value={formik.values.desc}
        name='desc'
        containerClassName='flex-1 '
        label='Description'
        rows='3'
        handleChange={formik.handleChange}
      />

      <Button
        size='regular'
        // onClick={() => onComplete('image')}
        onClick={handleForm}
        className='col-span-2 ml-auto'
      >
        Add Images
      </Button>
    </div>
  );
}

export default AddProjectForm;
