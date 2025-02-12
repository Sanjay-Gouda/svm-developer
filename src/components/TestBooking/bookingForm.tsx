import { Button, Input, Label } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { useBankDetails } from '@/hooks/useBankDetails';
import { useCustomerDetails } from '@/hooks/useClientDetails';
import { useProjectDetails } from '@/hooks/useProjectDetails';
import { toast } from 'react-toastify';

import { customerNameProps } from '@/components/Booking/bookingFormTypes';
import ComboBox from '@/components/ComboBox/comboBox';
import MultipleSelect from '@/components/ComboBox/multipleComboBox';
import { SvmProjectToast } from '@/components/Toast/Toast';
import DateSelector from '@/components/UI/DatePicker';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption } from '@/components/ui-blocks/input';
import CancelModal from './cancelModal';
import { httpInstance } from '@/constants/httpInstances';


type EditFormProps = {
  loader: boolean;
  clientError: boolean;
  editInitialValues?: any;
  editId?: string;
  clientErrorMessage: string;
  clientSelect?: customerNameProps;
  setClientSelect: (person: customerNameProps) => void;
  selectProject?: customerNameProps;
  setSelectedProject?: (person: customerNameProps) => void;
  areaValue?: string | undefined;
  handleArea?: (e: any) => void;
  handleMoveToUpload?: () => void;
  areaErrorMessage?: string | undefined;
  areaError?: boolean;
  handlePlotNo: (e: any) => void;
  plotNoValue: number;
  plotNoErrorMessage: boolean;

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
  dateError: boolean;
  dateErrorMessage?: string;

  btBankNameValue: string | undefined;
  handleBtBankName: (e: any) => void;
  btBankNameError: boolean;
  dastavejAmt: number;
  handleDastavejAmt: () => void;
  noOfInstallMentValue: number;

  handleNoOfInstallment: (e: any) => void;
  installmentError: boolean;
  installmentErrorMessage: string | undefined;

  amtPerInstallmentValue: number;
  handleAmtPerInstallment: (e: any) => void;
  amtPerInstallError: boolean;
  amtPerInstallmentMessage: string | undefined;
  handleSelectOption: (e: any) => void;
  reminderDate: any;
  onReminderDateChange: (date: Date) => void;
};

const BookingForm = ({
  editId,
  loader,
  dastavejAmt,
  handleDastavejAmt,
  reminderDate,
  onReminderDateChange,
  selectedDate,
  onDateChange,
  clientSelect,
  setClientSelect,
  selectProject,
  setSelectedProject,
  handleArea,
  areaValue,
  areaError,
  areaErrorMessage,
  handlePlotNo,
  plotNoValue,
  plotNoErrorMessage,
  dateErrorMessage,
  dateError,
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
  clientErrorMessage,
}: EditFormProps) => {
  
  const routes = useRouter();
  const customerList = useCustomerDetails();

  const projectList = useProjectDetails();
  const accountList = useBankDetails();

  const [refundAmt,setRefundAmt] = useState<number>(0);
  const [cancelLoader,setCancelLoader] = useState<boolean>(false);

  const handleRefundAmt = (e:any) => {
    setRefundAmt(e.target.value);
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCancelBooking = async () => {
    setCancelLoader(true);
    try {
      const res = await httpInstance.patch(`booking/cancel/${editId}`,{refundAmt:refundAmt});
      toast.success(res?.data?.message || 'This booking has been cancelled successfully');
      handleCloseModal();
      setCancelLoader(false);
    } catch (err) {
      setCancelLoader(false);
      handleCloseModal();
      toast.error('Something Went wrong');
    }}
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
    {
      editId && 
      <div className='flex justify-end w-full'>
        <Button onClick={()=>setIsModalOpen(true)}>Cancel Booking</Button>
      </div>
    }

      <div className='mx-auto flex w-1/3 flex-col gap-2'>
        <div className='flex flex-col'>
          <Label>Client Name *</Label>
          <MultipleSelect
            filteredCustomer={filteredCustomer}
            selected={clientSelect}
            setSelected={setClientSelect}
            query={query}
            hadnleSearchQuery={hadnleSearchQuery}
            afterLeave={afterLeave}
            placeholder='Search Client'
          />
        </div>
        <div className='flex flex-col'>
          <Label>Project Name *</Label>
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
            type='number'
            name='area'
            label='Area'
            placeholder='area'
            value={areaValue}
            onChange={handleArea}
          />
          {areaError && <div className='text-red-400'>{areaErrorMessage}</div>}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='plotNo'
            label='Plot No/Room No'
            placeholder='Plot No/Room No'
            value={plotNoValue}
            onChange={handlePlotNo}
          />
          {plotNoErrorMessage && (
            <div className='text-red-400'>{areaErrorMessage}</div>
          )}
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='number'
            name='totalAmt'
            label='Total Amount *'
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
            type='number'
            name='paidAmt'
            label='Paid Amount *'
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
            type='number'
            name='remainingAmt'
            label='Remaining Amount'
            value={remainAmtValue}
            disabled
            // onChange={formik.handleChange}
          />

          {remainingAmtError && (
            <div className='text-red-400'>{remainingAmtErrorMessage}</div>
          )}
        </div>

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
            type='number'
            disabled
            name='amtPerInstallment'
            label='Amount Per Installment *'
            value={amtPerInstallmentValue}
            onChange={handleAmtPerInstallment}
          />

          {amtPerInstallError && (
            <div className='text-red-400'>{+amtPerInstallmentMessage}</div>
          )}
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='number'
            name='dastavejAmt'
            label='Dastavej Amount'
            value={dastavejAmt}
            onChange={handleDastavejAmt}
          />

          {/* {amtPerInstallError && (
            <div className='text-red-400'>{+amtPerInstallmentMessage}</div>
          )} */}
        </div>

        <div className='flex w-full flex-col'>
          <Label>Select EMI Date</Label>
          <DateSelector
            name='emiDate'
            selected={selectedDate}
            onChange={onDateChange}
          />
          {dateError && (
            <div className='text-red-400'>Please Select EMI Date</div>
          )}
        </div>

        <div className='flex w-full flex-col'>
          <Label>Select Reminder Date</Label>
          <DateSelector
            name='reminderDate'
            selected={reminderDate}
            onChange={onReminderDateChange}
          />
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
              <span className='ml-2'>Cheque</span>
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

        {paymentMethodType !== 'CASH' && (
          <div className='flex flex-col'>
            <Label>Bank Account *</Label>
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
        )}

        {/* For Cheque */}
        <>
          {paymentMethodType === 'CHEQUE' ? (
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <TextInput
                  type='number'
                  name='cheuqeNo'
                  value={chequeNoValue}
                  onChange={handlechequeNo}
                  label='Cheque No'
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
          <SelectOption
            options={['PENDING', 'IN PROGRESS', 'COMPLETED']}
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

        {editId ? (
          <>
            <Button onClick={handleMoveToUpload}>
              {/* Update */}
              {loader ? 'Saving...' : 'Update'}
            </Button>
            <Button
              layout='outline'
              onClick={() => routes.push('/admin/booking')}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => handleMoveToUpload()}>
              {loader ? 'Saving...' : 'Submit'}
            </Button>
          </>
        )}

        <SvmProjectToast />
      </div>
        <CancelModal loader={cancelLoader}  handleRefundAmt={handleRefundAmt} refundAmt={refundAmt}  paidAmtValue={paidAmtValue} open={isModalOpen} onClose={handleCloseModal} handleCancel={handleCancelBooking} />
    </>
  );
};

export default BookingForm;
