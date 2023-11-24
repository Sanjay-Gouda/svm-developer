import { Card, CardBody } from '@windmill/react-ui';

import HappyCustomer from '@/components/HappyCustomers';
import Layout from '@/containers/Layout';

const AddHappyCustomer = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <HappyCustomer />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};
export default AddHappyCustomer;
