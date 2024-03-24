import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import TestBooking from '@/components/TestBooking';
import Layout from '@/containers/Layout';

const RegisterForm = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto w-full p-2'>
          <CardBody>
            <TestBooking />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default RegisterForm;
