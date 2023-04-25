import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@windmill/react-ui';
import React from 'react';

import { TextInput } from '@/components/ui-blocks';
import { VehicleChargeTable } from '@/components/vehicle/vehicle-charge-tabel';

export const VehicleAddCharge = () => {
  return (
    <Modal isOpen={true}>
      <ModalHeader>Add Vehicle Charges</ModalHeader>
      <ModalBody>
        <div className='mb-5 flex items-end gap-3'>
          <TextInput label='Charge Detail' containerClassName='flex-1' />
          <TextInput label='Charge Detail' containerClassName='flex-1' />
          <Button>Add</Button>
        </div>
        <div className='mx-[-20px] max-h-[40vh] overflow-y-auto px-[20px]'>
          <VehicleChargeTable />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button>Save</Button>
      </ModalFooter>
    </Modal>
  );
};
