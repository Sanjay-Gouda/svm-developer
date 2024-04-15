import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@windmill/react-ui';
import React from 'react';

type TModel = {
  title: string;
  isModalOpen: boolean;
  handleClose: () => void;
  modalBody: any;
  handleUpload: () => void;
  isDisabled?: boolean;
  isLoading: boolean;
};

const ImageModal = ({
  handleClose,
  isModalOpen,
  modalBody,
  handleUpload,
  title,
  isLoading,
  isDisabled,
}: TModel) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className='w-full sm:w-auto'
            onClick={handleUpload}
            disabled={isDisabled}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ImageModal;
