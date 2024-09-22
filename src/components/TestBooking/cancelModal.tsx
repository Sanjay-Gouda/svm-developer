import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from '@windmill/react-ui';
import { TextInput } from '../ui-blocks';

type TCancelModal = {
    open: boolean;
    onClose: () => void;
    handleCancel: () => void;
    paidAmtValue: number;
    handleRefundAmt: (e:any) => void;
    refundAmt: number;
    loader: boolean;
}

function CancelModal({open, loader, handleRefundAmt,refundAmt, onClose, handleCancel, paidAmtValue}: TCancelModal){
    return(
        <>
        <Modal isOpen={open} onClose={onClose}>
          <ModalHeader>Are you sure you want to cancel the booking?</ModalHeader>
          <ModalBody>
            <div className='flex gap-2 flex-col'>
              <TextInput type='number' value={paidAmtValue} disabled name='paidAmount' label='Paid Amount' />
              <TextInput type='number' name='refundAmount' value={refundAmt} onChange={handleRefundAmt} label='Refund Amount' />              

            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className='w-full sm:w-auto'
              layout='outline'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
            disabled={loader}
              className='w-full bg-red-500 hover:bg-red-500 sm:w-auto'
              onClick={handleCancel}
            >
              {loader ? 'Cancelling...' : 'Yes,Cancel'}
            </Button>
          </ModalFooter>
        </Modal>

        </>
    )
}


export default CancelModal;
