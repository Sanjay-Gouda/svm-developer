import { Card, CardBody } from '@windmill/react-ui';

import AccountForm from '@/components/Accounts/accountForm';
import Layout from '@/containers/Layout';

const AddAccounts = () => {
  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <AccountForm />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};
export default AddAccounts;
