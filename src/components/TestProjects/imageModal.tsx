import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@windmill/react-ui';
import React, { useState } from 'react';

import LogoContainer from '@/components/Projects/logoContainer';

type TModel = {
  isModalOpen: boolean;
  handleClose: () => void;
};

const ImageModal = ({ handleClose, isModalOpen, openModal }: TModel) => {
  const [projectLogo, setProjectLogo] = useState<any>([]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <ModalHeader>Update Logo</ModalHeader>
        <ModalBody>
          <LogoContainer
            projectLogo={projectLogo}
            setProjectLogo={setProjectLogo}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className='w-full sm:w-auto'>Accept</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ImageModal;
