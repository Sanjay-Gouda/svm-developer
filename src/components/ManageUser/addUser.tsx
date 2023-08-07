import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@windmill/react-ui';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import ComboBox from '@/components/ComboBox/comboBox';
import { TextInput } from '@/components/ui-blocks';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('First Name is required '),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Customer Mobile Number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  userRole: Yup.string().required('Please select user role '),
});

type modalProps = {
  openModal: boolean;
  closeModal: () => void;
};

type addUser = {
  name: string;
  phone: number | undefined;
  email: string;
  userRole: any;
};

const initialValue: addUser = {
  name: '',
  phone: undefined,
  email: '',
  userRole: '',
};

const AddUser = ({ closeModal, openModal }: modalProps) => {
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values: addUser) => {
      console.log(values);
    },
  });

  return (
    <Modal isOpen={openModal} onClose={closeModal}>
      <ModalHeader>Add User</ModalHeader>
      <ModalBody>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col '>
            <TextInput
              type='text'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              label='Name'
            />

            {formik.touched.name && formik.errors.name && (
              <div className='text-red-400'> {formik.errors.name}</div>
            )}
          </div>
          <div className='flex flex-col '>
            <TextInput
              type='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              label='Email'
            />

            {formik.touched.email && formik.errors.email && (
              <div className='text-red-400'> {formik.errors.email}</div>
            )}
          </div>
          <div className='flex flex-col '>
            <TextInput
              type='text'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              label='Mobile No'
            />

            {formik.touched.phone && formik.errors.phone && (
              <div className='text-red-400'> {formik.errors.phone}</div>
            )}
          </div>

          <div className='flex flex-col'>
            <Label>User Role</Label>

            <ComboBox placeholder='Select User' />
            {formik.touched.userRole && formik.errors.userRole && (
              <div className='text-red-400'> {formik.errors.userRole}</div>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className='w-full sm:w-auto'
          layout='outline'
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          className='w-full sm:w-auto'
          onClick={() => formik.handleSubmit()}
        >
          Accept
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUser;
