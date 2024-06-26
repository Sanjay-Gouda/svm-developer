import {
  Button,
  Label,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import EmptyState from '@/components/Empty';
import { TExpanseInitialValues } from '@/components/MonthlyExpense/types';
import { SvmProjectToast } from '@/components/Toast/Toast';
import DateSelector from '@/components/UI/DatePicker';
import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

const AddMonthlyExpense = () => {
  const initialValues: TExpanseInitialValues = {
    createdAt: null,
    expenseName: '',
    cost: '',
  };
  const [expenseList, setExpenseList] = useState<TExpanseInitialValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values: TExpanseInitialValues, { resetForm }) => {
      setExpenseList([...expenseList, values]);
      resetForm();
    },
  });

  const handleSubmitExpenseList = async () => {
    setIsLoading(true);
    try {
      const res = await httpInstance.post(`expense/monthly/create`, {
        data: expenseList,
      });
      setExpenseList([]);
      toast.success(res?.data?.message || 'Expense list added Successfully');
      setIsLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='m-auto h-[70vh] w-1/2 flex-col justify-center'>
        <div className='mx-auto flex  w-full items-end justify-center gap-2'>
          <div className='flex flex-col '>
            <Label>Select Date</Label>
            <DateSelector
              name='createdAt'
              selected={formik.values.createdAt}
              onChange={(date: Date) => formik.setFieldValue('createdAt', date)}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <TextInput
              name='expenseName'
              value={formik.values.expenseName}
              onChange={formik.handleChange}
              type='text'
              label='Expense Name'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <TextInput
              name='cost'
              value={formik.values.cost}
              onChange={formik.handleChange}
              type='number'
              label='amount'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <Button onClick={() => formik.handleSubmit()}>Add</Button>
          </div>
        </div>

        {expenseList?.length > 0 ? (
          <>
            <div className='mx-auto mt-4 flex w-full items-center  justify-center gap-2'>
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className='text-[14px]'>Dates</TableCell>
                      <TableCell className='text-[14px]'>Expenses</TableCell>
                      <TableCell className='text-[14px]'>Amount</TableCell>
                      <TableCell className='text-[14px]'>Action</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {expenseList?.map((list, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{list.createdAt.toDateString()}</TableCell>
                        <TableCell>{list.expenseName}</TableCell>
                        <TableCell>{list.cost}</TableCell>
                        <TableCell>
                          <p>Edit</p>
                          <p>Delete</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className='mt-4 flex w-full items-center justify-end '>
              <Button onClick={handleSubmitExpenseList} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </>
        ) : (
          <EmptyState btnLable='' heading='Please add Monthly Expenses' />
        )}
      </div>
      <SvmProjectToast />
    </>
  );
};

export default AddMonthlyExpense;
