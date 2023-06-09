import { Button } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { TDetailValues } from '@/components/Projects/projectDetailType';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';

import { setProjectinfo } from '@/store/projectSlices/projectDetail';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { ProjectFormTypes } from '@/pages/admin/realEstateProjects/projectForm/add';

type formProps = {
  onComplete?: (type: ProjectFormTypes) => void;
};

type projectProps = {
  onComplete?: formProps;
  editInitialValues?: any;
  editId?: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  // parentProject: Yup.string().required('Parent Project is required'),
  // status: Yup.string().required('status is required'),
  ownerName: Yup.string().required('Owner Name is required'),
  area: Yup.number().required('Area must be in number'),
  // projectStatus: Yup.string().required('Project Status is required'),
  pincode: Yup.string().required('Pincode is required'),
  state: Yup.string().required('state is required'),
  dist: Yup.string().required('district is required'),
  address1: Yup.string().required('address is required'),
});

const Status = ['ACTIVE', 'COMPLETED', 'UPCOMING'];
const ParentProjects = ['pp1', 'pp2', 'pp3'];

const addInitialValues: TDetailValues = {
  name: '',
  ownerName: '',
  parentProject: 'none',
  area: undefined,
  pincode: undefined,
  unit: 'meter',
  state: '',
  dist: '',
  description: '',
  status: 'upcomming',
  address1: undefined,
};

function AddProjectForm({
  onComplete,
  editId,
  editInitialValues,
}: projectProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const formValues = editId ? editInitialValues : addInitialValues;

  /* Update List */
  const updateProjectDetials = async (values) => {
    const {
      name,
      area,
      address1,
      address2,
      unit,
      status,
      pincode,
      description,
      ownerName,
    } = values;

    const payload = {
      address1: address1,
      area: area,
      name: name,
      description: description,
      ownerName: ownerName,
      pincode: pincode,
      status: status,
      unit: unit,
      address2: address2,
    };

    await axios({
      method: 'put',
      url: `${API_ENDPOINT.END_POINT}project/update/${editId}`,
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.success('Data updated successfully');
        setTimeout(() => {
          router.push('/admin/projects');
        }, 1000);
      })
      .catch((err) => {
        toast.error('Something went wrong');
      });
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: TDetailValues, { setSubmitting }) => {
      if (editId) {
        console.log(values);
        updateProjectDetials(values);
      } else {
        dispatch(setProjectinfo(values));
        if (Object.keys(formik.errors).length === 0) {
          onComplete('image');
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <div className='mx-auto  flex w-1/2 flex-col gap-2'>
      <TextInput
        onChange={formik.handleChange}
        value={formik.values.name}
        name='name'
        containerClassName='flex-1'
        label='Project Name'
        // valid={errors.name && touched.name}
      />

      {formik.touched.name && formik.errors.name && (
        <div className='text-red-400'>{formik.errors.name}</div>
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
      <div className='flex w-full flex-col'>
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
        {/* 
        <SelectOption
          onChange={formik.handleChange}
          title='Parent Project'
          options={ParentProjects}
          containerClassName='mt-1 w-[50%]'
          name='parentProject'
        /> */}
      </div>

      <div className='flex w-full items-center justify-between gap-4'>
        <div className='flex w-1/2 flex-col'>
          <SelectOption
            onChange={formik.handleChange}
            title='Parent Project'
            options={ParentProjects}
            containerClassName='flex-1 mt-1 w-full'
            name='parentProject'
          />
        </div>
        <div className='w-1/2'>
          <SelectOption
            onChange={formik.handleChange}
            title='Project Status'
            options={Status}
            containerClassName='mt-1'
            labelClassName='w-full'
            name='status'
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
        value={formik.values.description}
        name='description'
        containerClassName='flex-1 '
        label='Description'
        rows='3'
        handleChange={formik.handleChange}
      />

      {editId ? (
        <Button
          size='regular'
          // onClick={() => onComplete('image')}
          onClick={() => formik.handleSubmit()}
          className='col-span-2 ml-auto mt-3'
        >
          Update
        </Button>
      ) : (
        <Button
          size='regular'
          // onClick={() => onComplete('image')}
          onClick={() => formik.handleSubmit()}
          className='col-span-2 ml-auto mt-3'
        >
          Proceed
        </Button>
      )}
      <SvmProjectToast />
    </div>
  );
}

export default AddProjectForm;
