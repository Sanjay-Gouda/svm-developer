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
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import EmptyState from '@/components/Empty';
import { TPenaltyProps, TPenaltyValues } from '@/components/Penalty/TPenalty';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption } from '@/components/ui-blocks/input';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

const Penalty = ({ bookingId, penaltyHistory }: TPenaltyProps) => {
  const addPenaltyInitialValues = {
    penaltyAmt: 0,
    description: '',
    status: 'pending',
  };
  const [editInitialValues, setEditInitialValues] = useState({
    penaltyAmt: 0,
    description: '',
    status: 'pending',
  });
  const [editId, setEditId] = useState<string>();
  const [penaltyList, setPenaltyList] = useState(penaltyHistory);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const handleModalChange = () => {
    setOpenModal(true);
  };

  const resetInitialValues = (id: string) => {
    const values = penaltyHistory.find((item) => item.penaltyId === id);

    const { amount, description, isComplete } = values;

    setEditInitialValues({
      description: description,
      penaltyAmt: amount,
      status: isComplete ? 'completed' : 'pending',
    });
  };

  const refetchPenaltyList = async () => {
    try {
      const res = await httpInstance.get(`booking/penalty-list/${bookingId}`);
      console.log(res.data.result);
      setPenaltyList(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const addPenalty = async (values: TPenaltyValues) => {
    setLoading(true);
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
      refetchPenaltyList();
      setLoading(false);
      setTimeout(() => {
        router.push('/admin/booking');
      }, 1000);
    } catch (err) {
      setLoading(false);
      setOpenModal(false);
      console.log(err);
      toast.success(err?.data?.message);
      setTimeout(() => {
        router.push('/admin/booking');
      }, 1000);
    }
  };

  const updatePenalty = async (values: TPenaltyValues) => {
    setLoading(true);
    const { description, penaltyAmt, status } = values;
    const payload = {
      amount: penaltyAmt,
      description: description,
      isComplete: status === 'complete' ? true : false,
      // bookingId: editId,
    };
    try {
      const res = await httpInstance.patch(
        `/booking/update-penalty/${editId}`,
        payload
      );
      toast.success(res?.data?.message || 'Penalty updated Successfully');
      setOpenModal(false);
      refetchPenaltyList();
      resetInitialValues(editId);
      setLoading(false);
      setTimeout(() => {
        router.push('/admin/booking');
      }, 1000);
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong ');
      setOpenModal(false);
      setLoading(false);
      setTimeout(() => {
        router.push('/admin/booking');
      }, 1000);
    }
  };

  const handleEditModalOpen = (id: string) => {
    setEditId(id);

    resetInitialValues(id);
    setOpenModal(true);
  };

  const initialValues = editId ? editInitialValues : addPenaltyInitialValues;

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: TPenaltyValues, { resetForm }) => {
      editId ? updatePenalty(values) : addPenalty(values);
      resetForm();
    },
  });

  return (
    <>
      <Layout right={<Button onClick={handleModalChange}>Add Penalty</Button>}>
        {penaltyList?.length === 0 ? (
          <EmptyState
            btnLable='Add Penlaty'
            heading='Admin did not added Penalties yet'
            // redirectLink='realEstateProjects/accountForm/addAccounts'
          />
        ) : (
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell style={{ fontSize: '14px' }}>
                    Paid Amount
                  </TableCell>
                  <TableCell style={{ fontSize: '14px' }}>Status</TableCell>
                  <TableCell style={{ fontSize: '14px' }}>Created At</TableCell>
                  <TableCell style={{ fontSize: '14px' }}>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {penaltyList?.map((item) => (
                  <TableRow key={item.penlatyId}>
                    <TableCell>{item?.amount}</TableCell>
                    <TableCell>
                      {item?.isComplete ? 'Completed' : 'Pending'}
                    </TableCell>
                    <TableCell>
                      {item?.createdAt
                        ?.split('T')[0]
                        ?.split('-')
                        ?.reverse()
                        ?.join('-')}
                    </TableCell>
                    <TableCell>
                      <MdModeEditOutline
                        size='24'
                        onClick={() => handleEditModalOpen(item?.penaltyId)}
                        className='cursor-pointer'
                        style={{ color: ' #30bcc2' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
              options={['pending', 'complete']}
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
          {editId ? (
            <Button
              className='w-full sm:w-auto'
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {loading ? 'Updating...' : 'Update'}
            </Button>
          ) : (
            <Button
              className='w-full sm:w-auto'
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </ModalFooter>
      </Modal>
      <SvmProjectToast />
    </>
  );
};

export default Penalty;
