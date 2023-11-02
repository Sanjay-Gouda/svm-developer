import { Card, CardBody } from '@windmill/react-ui';

import InstallmentForm from '@/components/Installment/installmentFrom';
import Layout from '@/containers/Layout';

const AddInstallment = () => {
  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <InstallmentForm />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AddInstallment;
