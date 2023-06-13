import { Label } from '@windmill/react-ui';
import React, { useState } from 'react';

import ComboBox from '@/components/ComboBox/comboBox';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';

const BookingForm = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [paidAmt, setPaidAmt] = useState(0);
  const [remainingAmt, setRemainingAmt] = useState(0);

  const handleTotalAmtChange = (e) => {
    const newTotalAmt = parseInt(e.target.value);
    setTotalAmt(newTotalAmt);
    calculateRemainingAmt(newTotalAmt, paidAmt);
  };

  const handlePaidAmtChange = (e) => {
    const newPaidAmt = parseInt(e.target.value);
    setPaidAmt(newPaidAmt);
    calculateRemainingAmt(totalAmt, newPaidAmt);
  };

  const calculateRemainingAmt = (totalAmt, paidAmt) => {
    const remainingAmt = totalAmt - paidAmt;
    setRemainingAmt(remainingAmt);
  };

  return (
    <>
      <div className='mx-auto flex w-1/3 flex-col gap-2'>
        {/* <h1 className='block text-center text-2xl text-gray-700 dark:text-gray-400'>
          Payment Details
        </h1> */}
        <div className='flex flex-col'>
          <Label>Client Name</Label>
          <ComboBox placeholder='Search Client' />
        </div>
        <div className='flex flex-col'>
          <Label>Project Name</Label>
          <ComboBox placeholder='Search Project' />
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='area'
            label='Area'
            placeholder='e.g 30 sq.meter'
            // onChange={handleTotalAmtChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='pincode'
            label='Pincode'
            placeholder='e.g 394230'
            // onChange={handleTotalAmtChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='landmark'
            label='Landmark'
            placeholder='e.g Sachin'
            // onChange={handleTotalAmtChange}
          />
        </div>

        <TextInputArea
          // value={formik.values.address1}
          name='address1'
          containerClassName='flex-1 '
          label='Address'
          rows='2'
          // handleChange={formik.handleChange}
        />

        <div className='flex flex-col'>
          <Label>Bank Account</Label>
          <ComboBox placeholder='Select Account' />
        </div>
        <div className='flex flex-col'>
          <TextInput
            value={totalAmt}
            type='text'
            name='totalAmt'
            label='Total Amount'
            onChange={handleTotalAmtChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            value={paidAmt}
            type='text'
            name='paidAmt'
            label='Paid Amount'
            onChange={handlePaidAmtChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            value={remainingAmt}
            type='text'
            name='remainingAmt'
            label='Remaining Amount'
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='installmentCount'
            label='No.Of Installment'
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='amtPerInstallment'
            label='Amount Per Installment'
          />
        </div>
        <div className='flex flex-col'>
          <SelectOption
            options={['done', 'pending']}
            title='Payment Status'
            containerClassName='flex-1 mt-1 w-full'
            name='status'
          />
        </div>
      </div>
    </>
  );
};

export default BookingForm;
