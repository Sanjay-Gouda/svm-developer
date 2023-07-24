import { Button, Input, Label } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import 'react-toastify/dist/ReactToastify.css';

import { useBankDetails } from '@/hooks/useBankDetails';
import { useCustomerDetails } from '@/hooks/useClientDetails';
import { useProjectDetails } from '@/hooks/useProjectDetails';

import { customerNameProps } from '@/components/Booking/bookingFormTypes';
import ComboBox from '@/components/ComboBox/comboBox';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';

type EditFormProps = {
  editInitialValues?: any;
  editId?: string;
  clientSelect?: customerNameProps;
  setClientSelect?: (person: customerNameProps) => void;
  selectProject?: customerNameProps;
  setSelectedProject?: (person: customerNameProps) => void;
  areaValue?: string | undefined;
  handleArea?: (e: any) => void;
  handleMoveToUpload?: () => void;
  areaErrorMessage?: string | undefined;
  areaError?: boolean;
  pincodeValue?: string;
  handlePincode: (e: any) => void;
  pincodeError: boolean;
  pincodeErrorMessage: string | undefined;
  state: string;
  city: string;
  landmarkValue: string;
  landmarkError: boolean;
  landmarkErrorMessage: string | undefined;
  handleLandmark: (e: any) => void;
  addressValue: string | undefined;
  handleAddress: (e: any) => void;
  addressErrorMessage: string | undefined;
  addressError: boolean;
  selectBankAccount: customerNameProps;
  setSelectedBankAccount: (accounts: customerNameProps) => void;
  bankAccountError: boolean;
  bankAccountErrorMessage: any;
  totalAmtValue: number;
  handleTotalAmt: (e: any) => void;
  totalAmtError: boolean;
  totalAmtErrorMessage: string | undefined;
  paidAmtValue: number;
  handlePaidAmt: (e: any) => void;
  handlePaymentMethod: (e: any) => void;
  paidAmtError: boolean;
  paidAmtErrorMessage: string | undefined;
  remainingAmtErrorMessage: string | undefined;
  remainAmtValue: number;
  remainingAmtError: boolean;
  paymentMethodType: string;
  chequeNoValue: string | undefined;
  handlechequeNo: (e: any) => void;
  chequeNoError: boolean;

  cBankNameValue: string | undefined;
  handleCBankName: (e: any) => void;
  cBankNameError: boolean;

  upiValue: string | undefined;
  handleUpi: (e: any) => void;
  upiIdError: boolean;

  btAcNoValue: string | undefined;
  handleBtAcNo: (e: any) => void;
  btAcNoError: boolean;

  btBankNameValue: string | undefined;
  handleBtBankName: (e: any) => void;
  btBankNameError: boolean;

  noOfInstallMentValue: number;

  handleNoOfInstallment: (e: any) => void;
  installmentError: boolean;
  installmentErrorMessage: string | undefined;

  amtPerInstallmentValue: number;
  handleAmtPerInstallment: (e: any) => void;
  amtPerInstallError: boolean;
  amtPerInstallmentMessage: string | undefined;
  handleSelectOption: (e: any) => void;
};

const BookingForm = ({
  editId,
  editInitialValues,
  clientSelect,
  setClientSelect,
  selectProject,
  setSelectedProject,
  handleArea,
  areaValue,
  areaError,
  areaErrorMessage,
  handlePincode,
  pincodeError,
  pincodeErrorMessage,
  pincodeValue,
  state,
  city,
  handleLandmark,
  landmarkValue,
  landmarkError,
  landmarkErrorMessage,
  addressError,
  addressErrorMessage,
  addressValue,
  handleAddress,
  handleMoveToUpload,
  bankAccountError,
  bankAccountErrorMessage,
  selectBankAccount,
  setSelectedBankAccount,
  handleTotalAmt,
  totalAmtError,
  totalAmtErrorMessage,
  totalAmtValue,
  handlePaidAmt,
  paidAmtError,
  paidAmtErrorMessage,
  paidAmtValue,
  remainAmtValue,
  remainingAmtError,
  remainingAmtErrorMessage,
  handlePaymentMethod,
  paymentMethodType,
  btAcNoError,
  btAcNoValue,
  btBankNameError,
  btBankNameValue,
  cBankNameError,
  cBankNameValue,
  chequeNoError,
  chequeNoValue,
  handleBtAcNo,
  handleBtBankName,
  handleCBankName,
  handleUpi,
  handlechequeNo,
  upiIdError,
  upiValue,
  handleNoOfInstallment,
  installmentError,
  installmentErrorMessage,
  noOfInstallMentValue,
  amtPerInstallError,
  amtPerInstallmentMessage,
  amtPerInstallmentValue,
  handleAmtPerInstallment,
  handleSelectOption,
}: EditFormProps) => {
  console.log(cBankNameError, 'error');

  const routes = useRouter();
  const customerList = useCustomerDetails();

  const projectList = useProjectDetails();
  const accountList = useBankDetails();

  const [loader, setLoader] = useState(false);

  // const [pincodeQuery, setPincodeQuery] = useState();
  const [query, setQuery] = useState('');

  const hadnleSearchQuery = (e: any) => {
    setQuery(e.target.value);
  };

  const afterLeave = () => {
    setQuery('');
  };

  const filteredCustomer =
    query === ''
      ? customerList
      : customerList?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterProjects =
    query === ''
      ? projectList
      : projectList.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterAccounts =
    query === ''
      ? accountList
      : accountList.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className='mx-auto flex w-1/3 flex-col gap-2'>
        <div className='flex flex-col'>
          <Label>Client Name</Label>
          <ComboBox
            placeholder='Search Client'
            data={filteredCustomer}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={clientSelect}
            setSelected={setClientSelect}
          />

          {/* {formik.touched.customerName && formik.errors.customerName && (
            <div className='text-red-400'>{formik.errors.customerName}</div>
          )} */}
        </div>
        <div className='flex flex-col'>
          <Label>Project Name</Label>
          <ComboBox
            placeholder='Search Project'
            data={filterProjects}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={selectProject}
            setSelected={setSelectedProject}
          />
          {/* {formik.touched.projectName && formik.errors.projectName && (
            <div className='text-red-400'>{formik.errors.projectName}</div>
          )} */}
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='area'
            label='Area'
            placeholder='e.g 30 sq.meter'
            value={areaValue}
            onChange={handleArea}
          />
          {areaError && <div className='text-red-400'>{areaErrorMessage}</div>}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='pincode'
            label='Pincode'
            placeholder='e.g 394230'
            value={pincodeValue}
            // value={formik.values.pincode}
            onChange={handlePincode}
          />

          {pincodeError && (
            <div className='text-red-400'>{pincodeErrorMessage}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='state'
            label='State'
            placeholder='state'
            disabled={state ? true : false}
            // value={formik.values.pincode}
            // value={bookingState}
            value={state}
          />

          {/* {formik.touched.pincode && formik.errors.pincode && (
            <div className='text-red-400'>{formik.errors.pincode}</div>
          )} */}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='city'
            label='City'
            placeholder='City'
            disabled={city ? true : false}
            // value={formik.values.pincode}
            value={city}
          />

          {/* {formik.touched.pincode && formik.errors.pincode && (
            <div className='text-red-400'>{formik.errors.pincode}</div>
          )} */}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='landmark'
            label='Landmark'
            placeholder='e.g Sachin'
            value={landmarkValue}
            onChange={handleLandmark}
          />

          {landmarkError && (
            <div className='text-red-400'>{landmarkErrorMessage}</div>
          )}
        </div>

        <TextInputArea
          name='address'
          containerClassName='flex-1 '
          label='Address'
          rows='2'
          value={addressValue}
          handleChange={handleAddress}
        />

        {addressError && (
          <div className='text-red-400'>{addressErrorMessage}</div>
        )}

        <div className='flex flex-col'>
          <Label>Bank Account</Label>
          <ComboBox
            placeholder='Select Account'
            data={filterAccounts}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={selectBankAccount}
            setSelected={setSelectedBankAccount}
          />
          {bankAccountError && (
            <div className='text-red-400'>{bankAccountErrorMessage}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <TextInput
            // value={totalAmt}
            type='text'
            name='totalAmt'
            label='Total Amount'
            // onChange={handleTotalAmtChange}
            value={totalAmtValue}
            onChange={handleTotalAmt}
          />

          {totalAmtError && (
            <div className='text-red-400'>{totalAmtErrorMessage}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <TextInput
            // value={paidAmt}
            // onChange={handlePaidAmtChange}
            type='text'
            name='paidAmt'
            label='Paid Amount'
            value={paidAmtValue}
            onChange={handlePaidAmt}
          />

          {paidAmtError && (
            <div className='text-red-400'>{paidAmtErrorMessage}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <TextInput
            readOnly
            // value={remainingAmt}
            type='text'
            name='remainingAmt'
            label='Remaining Amount'
            value={remainAmtValue}
            // onChange={formik.handleChange}
          />

          {remainingAmtError && (
            <div className='text-red-400'>{remainingAmtErrorMessage}</div>
          )}
        </div>

        <div className='flex flex-col'>
          <Label className='mb-2'>Payment Type</Label>
          <div className='flex justify-between gap-2'>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='CASH'
                name='paymentMehod'
                checked={paymentMethodType === 'CASH'}
              />
              <span className='ml-2'>Cash</span>
            </Label>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='CHEQUE'
                name='paymentMehod'
                checked={paymentMethodType === 'CHEQUE'}
              />
              <span className='ml-2'>Cheuqe</span>
            </Label>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='UPI'
                name='paymentMehod'
                checked={paymentMethodType === 'UPI'}
              />
              <span className='ml-2'>UPI</span>
            </Label>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='BANK_TRANSFER'
                name='paymentMehod'
                checked={paymentMethodType === 'BANK_TRANSFER'}
              />
              <span className='ml-2'>Bank Transfer</span>
            </Label>
          </div>
        </div>

        {/* For Cheque */}
        <>
          {paymentMethodType === 'CHEQUE' ? (
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='cheuqeNo'
                  value={chequeNoValue}
                  onChange={handlechequeNo}
                  label='Cheuqe No'
                />

                {chequeNoError && (
                  <div className='text-red-400'>Cheque No is required</div>
                )}
              </div>

              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='cBankName'
                  value={cBankNameValue}
                  onChange={handleCBankName}
                  label='Bank Name'
                />
                {cBankNameError && (
                  <div className='text-red-400'>Bank Name is required</div>
                )}
              </div>
            </div>
          ) : null}
        </>
        {/* For UPI */}
        <>
          {paymentMethodType === 'UPI' ? (
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='UPIId'
                  value={upiValue}
                  onChange={handleUpi}
                  label='UPI ID'
                />

                {upiIdError && (
                  <div className='text-red-400'>UPI id required</div>
                )}
              </div>
            </div>
          ) : null}
        </>
        {/* For Bank Transfer */}
        <>
          {paymentMethodType === 'BANK_TRANSFER' ? (
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='BTAcNo'
                  value={btAcNoValue}
                  onChange={handleBtAcNo}
                  label='Account No.'
                />

                {btAcNoError && (
                  <div className='text-red-400'>Account No. is required</div>
                )}
              </div>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='BTBankName'
                  value={btBankNameValue}
                  onChange={handleBtBankName}
                  label='Bank Name'
                />
                {btBankNameError && (
                  <div className='text-red-400'>Bank Name is required</div>
                )}
              </div>
            </div>
          ) : null}
        </>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='noOfInstallment'
            label='No.Of Installment'
            value={noOfInstallMentValue}
            onChange={handleNoOfInstallment}
          />

          {installmentError && (
            <div className='text-red-400'>{installmentErrorMessage}</div>
          )}
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='amtPerInstallment'
            label='Amount Per Installment'
            value={amtPerInstallmentValue}
            onChange={handleAmtPerInstallment}
          />

          {amtPerInstallError && (
            <div className='text-red-400'>{amtPerInstallmentMessage}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <SelectOption
            options={['COMPLETED', 'PENDING', 'PARTIAL']}
            title='Payment Status'
            containerClassName='flex-1 mt-1 w-full'
            name='paymentStatus'
            // value={formik.values.remainingAmt}
            onChange={handleSelectOption}
          />

          {/* {formik.touched.paymentStatus && formik.errors.paymentStatus && (
            <div className='text-red-400'>{formik.errors.paymentStatus}</div>
          )} */}
        </div>

        {!editId ? (
          <Button
            // onClick={() => {
            //   formik.handleSubmit();
            // }}
            onClick={() => handleMoveToUpload()}
          >
            Upload Documents
            {loader && <ClipLoader size={20} color='white' />}
          </Button>
        ) : (
          <>
            <Button
              // onClick={() => {
              //   formik.handleSubmit();
              // }}

              onClick={handleMoveToUpload}
            >
              Update
              {loader && <ClipLoader size={20} color='white' />}
            </Button>
            <Button
              layout='outline'
              onClick={() => routes.push('/admin/booking')}
            >
              Cancel
            </Button>
          </>
        )}

        <SvmProjectToast />
      </div>
    </>
  );
};

export default BookingForm;
