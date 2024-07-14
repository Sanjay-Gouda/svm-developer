import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import AddMonthlyExpense from '@/components/MonthlyExpense/monthlyExpense';
import Layout from '@/containers/Layout';

const AddExpenses = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <AddMonthlyExpense />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default AddExpenses;
