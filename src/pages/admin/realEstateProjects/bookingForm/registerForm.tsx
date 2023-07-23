import { Card, CardBody } from '@windmill/react-ui';
import React, { useState } from 'react';

import BookingForm from '@/components/Booking/bookingForm';
import UploadDocuments from '@/components/Booking/uploadDocuments';
import TestBooking from '@/components/TestBooking';
import Layout from '@/containers/Layout';

export type bookingComponetTypes = 'form' | 'imageUpload';

const PhaseComponent: Record<
  bookingComponetTypes,
  React.FC<{ onComplete: (type: bookingComponetTypes) => void }>
> = {
  form: BookingForm,
  imageUpload: UploadDocuments,
};

const RegisterForm = () => {
  const [componentPhase, setComponentPhase] =
    useState<bookingComponetTypes>('form');

  const Component = PhaseComponent[componentPhase];

  return (
    <>
      <Layout>
        <Card className='mx-auto w-full p-2'>
          <CardBody>
            {/* <BookingForm /> */}
            <TestBooking />
            {/* <Component onComplete={setComponentPhase} /> */}
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default RegisterForm;
