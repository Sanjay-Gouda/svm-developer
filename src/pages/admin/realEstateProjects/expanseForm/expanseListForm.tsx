import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import ExpanseForm from '@/components/Expanse/expanseForm';
import Layout from '@/containers/Layout';

const ExpanseListForm = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <ExpanseForm />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default ExpanseListForm;
