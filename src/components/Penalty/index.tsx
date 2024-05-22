import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@windmill/react-ui';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { TPenaltyProps, TPenaltyValues } from '@/components/Penalty/TPenalty';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption } from '@/components/ui-blocks/input';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

const Penalty = ({ bookingId }: TPenaltyProps) => {
  const addPenaltyInitialValues = {
    penaltyAmt: 0,
    description: '',
    status: 'pending',
  };

  const [openModal, setOpenModal] = useState(false);

  const handleModalChange = () => {
    setOpenModal(true);
  };

  const addPenalty = async (values: TPenaltyValues) => {
    const { description, penaltyAmt, status } = values;
    const payload = {
      amount: penaltyAmt,
      description: description,
      isComplete: status === 'complete' ? true : false,
      bookingId: bookingId,
    };
    try {
      const res = await httpInstance.post(`/booking/add-penalty`, payload);
      toast.success(res?.data?.message || 'Penalty added Successfully');
      setOpenModal(false);
    } catch (err) {
      setOpenModal(false);
      console.log(err);
      toast.success(err?.data?.message);
    }
  };

  // const updatePenalty = async (values: TPenaltyValues)=>{
  //   const { description, penaltyAmt, status } = values;
  //   const payload = {
  //     amount: penaltyAmt,
  //     description: description,
  //     isComplete: status === 'complete' ? true : false,
  //     bookingId: bookingId,
  //   };
  //     try{
  //       const res = await httpInstance.patch(`/booking/update-penalty`, payload)
  //     }catch(err){
  //       console.log(err)
  //     }

  // }

  const formik = useFormik({
    initialValues: addPenaltyInitialValues,
    onSubmit: (values: TPenaltyValues, { resetForm }) => {
      // console.log(values);
      addPenalty(values);
      resetForm();
    },
  });

  return (
    <>
      <Layout right={<Button onClick={handleModalChange}>Add Penalty</Button>}>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Paid Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>200</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Add Penalty</ModalHeader>
        <ModalBody>
          <div className='flex flex-col'>
            <TextInput
              type='number'
              name='penaltyAmt'
              label='Penalty Amount *'
              value={formik.values.penaltyAmt}
              onChange={formik.handleChange}
            />
          </div>
          <div className='flex flex-col'>
            <TextInput
              type='text'
              name='description'
              label='Description'
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          <div className='flex flex-col'>
            <SelectOption
              title='Project Status'
              options={['Pending', 'Completed']}
              containerClassName='mt-1'
              labelClassName='w-full'
              name='status'
              onChange={formik.handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            className='w-full sm:w-auto'
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <SvmProjectToast />
    </>
  );
};

export default Penalty;
