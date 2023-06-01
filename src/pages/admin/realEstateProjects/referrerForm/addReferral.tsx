import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import ReferrerForm from '@/components/Referrer/referrerForm';
import Layout from '@/containers/Layout';

const AddReferrer = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <ReferrerForm />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default AddReferrer;
