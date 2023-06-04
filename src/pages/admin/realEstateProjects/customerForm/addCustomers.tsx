import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import CustomerForm from '@/components/Customers/customerForm';
import Layout from '@/containers/Layout';

const AddCustomers = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <CustomerForm />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default AddCustomers;
