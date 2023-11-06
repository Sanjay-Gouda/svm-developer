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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  // parentProject: Yup.string().required('Parent Project is required'),
  // status: Yup.string().required('status is required'),
  ownerName: Yup.string().required('Owner Name is required'),

  area: Yup.number().required('Area must be in number'),
  emiAmt: Yup.number().required('Amount must be in number'),
  downPayment: Yup.number().required(' Amount must be in number'),
  totalAmt: Yup.number().required('Amount must be in number'),
  // location: Yup.number().required('Area must be in number'),

  // projectStatus: Yup.string().required('Project Status is required'),
  pincode: Yup.string().required('Pincode is required'),
  // state: Yup.string().required('state is required'),
  // dist: Yup.string().required('district is required'),
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
  emiAmt: undefined,
  downPayment: undefined,
  totalAmt: undefined,
  location: '',
};

type projectProps = {
  onComplete?: formProps;
  editInitialValues?: any;
  editId?: string;

  handleName: (e: any) => void;
  nameValue: string;
  nameError: boolean;
  handleProceed: () => void;
  nameErrorMessage: string | undefined;

  ownerNameValue: string;

  handleOwnerName: (e: any) => void;
  ownerNameError: boolean;
  ownerNameErrorMessage: string | undefined;

  areaValue: string | number | undefined;

  emiAmt: number | undefined;
  handleEmi: (e: any) => void;
  emiAmtError: boolean;
  emiErrorMessage: string | undefined;
  downPayment: number | undefined;
  handleDownPayment: (e: any) => void;
  downPaymentError: boolean;
  downPaymentErrorMessage: string | undefined;

  totalAmt: number | undefined;
  handleTotalAmount: (e: any) => void;
  totalAmtError: boolean;
  totalAmtErrorMessage: string | undefined;

  handleArea: (e: any) => void;
  areaError: boolean;
  areaErrorMessgage: string | undefined;
  handleParentProject: (e: any) => void;
  handleStatus: (e: any) => void;
  pincodeValue: number | undefined;
  handlePincode: (e: any) => void;
  pincodeError: boolean;
  pincodeErrorMessage: string | undefined;
  distValue: string;
  handleDist: (e: any) => void;

  handleState: (e: any) => void;
  stateValue: string;

  addressValue: string | undefined;
  handleAddress: (e: any) => void;
  addressError: boolean;
  addressErrorMessage: string | undefined;

  secondaryAddressValue: string | undefined;
  handleSecondaryAddress: (e: any) => void;

  descValue: string | undefined;
  handleDesc: (e: any) => void;
};

function AddProjectForm({
  onComplete,
  editId,
  editInitialValues,
  handleName,
  nameValue,
  nameError,
  nameErrorMessage,
  handleProceed,
  addressError,
  addressErrorMessage,
  addressValue,
  areaError,
  areaErrorMessgage,
  areaValue,
  descValue,
  distValue,
  emiAmt,
  handleEmi,
  emiAmtError,
  emiErrorMessage,
  handleAddress,
  handleArea,
  handleDesc,
  handleDist,
  handleOwnerName,
  handleParentProject,
  handlePincode,
  handleSecondaryAddress,
  handleState,
  handleStatus,
  ownerNameError,
  ownerNameErrorMessage,
  ownerNameValue,
  pincodeError,
  pincodeErrorMessage,
  pincodeValue,
  secondaryAddressValue,
  stateValue,

  downPayment,
  downPaymentError,
  downPaymentErrorMessage,
  handleDownPayment,

  handleTotalAmount,
  totalAmt,
  totalAmtError,
  totalAmtErrorMessage,
}: projectProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [pincodeQuery, setPincodeQuery] = useState();

  // const handlePinCodeApi = async (e) => {
  //   const query = e.target.value;
  //   setPincodeQuery(query);

  //   formik.setFieldValue('pincode', query);
  // };

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     await axios({
  //       method: 'get',
  //       url: `${API_ENDPOINT.END_POINT}/appConfig/pincode?zip=${pincodeQuery}`,
  //     })
  //       .then((res) => {
  //         // console.log(res);

  //         formik.setFieldValue('state', res?.data?.result[0].State);
  //         formik.setFieldValue('dist', res?.data?.result[0].District);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, 200);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [pincodeQuery]);

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
        onChange={handleName}
        value={nameValue}
        name='name'
        containerClassName='flex-1'
        label='Project Name'
        // valid={errors.name && touched.name}
      />

      {nameError && <div className='text-red-400'>{nameErrorMessage}</div>}

      <TextInput
        onChange={handleOwnerName}
        value={ownerNameValue}
        name='ownerName'
        containerClassName=' flex-1'
        label='Projects Owner'
      />

      {ownerNameError && (
        <div className='text-red-400'>{ownerNameErrorMessage}</div>
      )}
      <div className='flex w-full flex-col'>
        <TextInput
          onChange={handleArea}
          value={areaValue}
          name='area'
          containerClassName='w-full'
          label='Area'
        />
        {areaError && <div className='text-red-400'>{areaErrorMessgage}</div>}
      </div>

      <div className='flex w-full items-center justify-between gap-4'>
        <div className='flex w-1/2 flex-col'>
          <SelectOption
            onChange={handleParentProject}
            title='Parent Project'
            options={ParentProjects}
            containerClassName='flex-1 mt-1 w-full'
            name='parentProject'
          />
        </div>
        <div className='w-1/2'>
          <SelectOption
            onChange={handleStatus}
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
            // onChange={formik.handleChange}
            onChange={handlePincode}
            value={pincodeValue}
            name='pincode'
            containerClassName='w-full'
            label='Pincode'
          />
          {pincodeError && (
            <div className='text-red-400'>{pincodeErrorMessage}</div>
          )}
        </div>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={handleDist}
            value={distValue}
            name='dist'
            containerClassName=' w-full'
            label='District'
          />
          {/* {formik.touched.dist && formik.errors.dist && (
            <div className='text-red-400'>{formik.errors.dist}</div>
          )} */}
        </div>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={handleState}
            value={stateValue}
            name='state'
            containerClassName=' w-full'
            label='State'
          />
          {/* {formik.touched.state && formik.errors.state && (
            <div className='text-red-400'>{formik.errors.state}</div>
          )} */}
        </div>
      </div>
      <div className='flex w-full  gap-4'>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={handleEmi}
            // onChange={handlePincode}
            value={emiAmt}
            name='emiAmt'
            containerClassName='w-full'
            label='EMI'
          />
          {emiAmtError && <div className='text-red-400'>{emiErrorMessage}</div>}
        </div>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={handleDownPayment}
            value={downPayment}
            name='downPayment'
            containerClassName=' w-full'
            label='Down Payment'
          />
          {downPaymentError && (
            <div className='text-red-400'>{downPaymentErrorMessage}</div>
          )}
        </div>
        <div className='flex w-full flex-col'>
          <TextInput
            onChange={handleTotalAmount}
            value={totalAmt}
            name='totalAmt'
            containerClassName=' w-full'
            label='Total Price'
          />
          {totalAmtError && (
            <div className='text-red-400'>{totalAmtErrorMessage}</div>
          )}
        </div>
      </div>

      <TextInputArea
        value={addressValue}
        name='address1'
        containerClassName='flex-1 '
        label='Address 1'
        rows='1'
        handleChange={handleAddress}
      />
      {addressError && (
        <div className='text-red-400'>{addressErrorMessage}</div>
      )}
      <TextInputArea
        value={secondaryAddressValue}
        name='address2'
        containerClassName='flex-1 '
        label='Address 2'
        rows='1'
        handleChange={handleSecondaryAddress}
      />

      <TextInputArea
        value={descValue}
        name='description'
        containerClassName='flex-1 '
        label='Description'
        rows='3'
        handleChange={handleDesc}
      />

      {editId ? (
        <div className='flex w-full justify-between'>
          <Button
            size='regular'
            layout='outline'
            // onClick={() => onComplete('image')}
            onClick={() => router.push('/admin/projects')}
            className='col-span-2  mt-3'
          >
            Cancel
          </Button>

          <Button
            size='regular'
            // onClick={() => onComplete('image')}
            onClick={() => formik.handleSubmit()}
            className='col-span-2  mt-3'
          >
            Update
          </Button>
        </div>
      ) : (
        <Button
          size='regular'
          // onClick={() => onComplete('image')}
          // onClick={() => formik.handleSubmit()}
          onClick={handleProceed}
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
