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
};

const ImageModal = ({
  handleClose,
  isModalOpen,
  modalBody,
  handleUpload,
  title,
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
          <Button className='w-full sm:w-auto' onClick={handleUpload}>
            Upload
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ImageModal;
