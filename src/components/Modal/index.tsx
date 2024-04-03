import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@windmill/react-ui';
import React from 'react';

type TModal = {
  isModalOpen: boolean;
  closeModal: () => void;
  handleDelete: (id: string) => void;
};

function DeleteModal({ isModalOpen, closeModal, handleDelete }: TModal) {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Remove Data</ModalHeader>
        <ModalBody>Are you Sure ?</ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className='w-full bg-red-500 hover:bg-red-500 sm:w-auto'
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default DeleteModal;
