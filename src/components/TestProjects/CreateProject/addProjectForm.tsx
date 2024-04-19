import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';

const Status = ['ACTIVE', 'COMPLETED', 'UPCOMING'];
const ParentProjects = ['pp1', 'pp2', 'pp3'];

type projectProps = {
  editInitialValues?: any;
  editId?: string;
  loader: boolean;
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
  loader,
  editId,
}: projectProps) {
  const router = useRouter();

  return (
    <div className='mx-auto mt-5  flex w-1/2 flex-col gap-2'>
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
        {/* <div className='flex w-1/2 flex-col'>
          <SelectOption
            onChange={handleParentProject}
            title='Parent Project'
            options={ParentProjects}
            containerClassName='flex-1 mt-1 w-full'
            name='parentProject'
          />
        </div> */}
        <div className='w-full'>
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
            disabled
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
            disabled
            containerClassName=' w-full'
            label='State'
          />
          {/* {formik.touched.state && formik.errors.state && (
            <div className='text-red-400'>{formik.errors.state}</div>
          )} */}
        </div>
      </div>
      {/* <div className='flex w-full  gap-4'>
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
      </div> */}

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
        label='Village Address'
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

      <div className='flex w-full justify-between'>
        <Button
          size='regular'
          layout='outline'
          onClick={() => router.push('/admin/projects')}
          className='col-span-2  mt-3'
        >
          Cancel
        </Button>
        {loader ? (
          <Button className=' col-span-2 ml-auto mt-3'>
            Saving...
            {/* <ClipLoader size={20} color='white' /> */}
          </Button>
        ) : (
          <Button
            size='regular'
            onClick={handleProceed}
            className='col-span-2 ml-auto mt-3'
          >
            {editId ? 'Update' : 'Save & Next'}
          </Button>
        )}
      </div>
      <SvmProjectToast />
    </div>
  );
}

export default AddProjectForm;
