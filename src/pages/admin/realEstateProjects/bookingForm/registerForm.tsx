import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import BookingForm from '@/components/Booking/bookingForm';
import Layout from '@/containers/Layout';

const RegisterForm = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto w-full p-2'>
          <CardBody>
            <BookingForm />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default RegisterForm;
