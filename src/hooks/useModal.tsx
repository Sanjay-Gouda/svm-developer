import { useState } from 'react';

type TUseModal = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  deleteId: string;
  handleModalOpen: (id: string) => void;
};

export const useModal = (): TUseModal => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const handleModalOpen = (id: string) => {
    openModal();
    setDeleteId(id);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    deleteId,
    handleModalOpen,
  };
};
