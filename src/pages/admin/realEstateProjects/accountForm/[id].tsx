import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import AccountForm from '@/components/Accounts/accountForm';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export async function getServerSideProps(params: any) {
  const id = params.params.id;

  const res = await httpInstance.get(`account/get/${id}`);
  const accountDetails = res?.data?.result;

  return {
    props: { id, accountDetails },
  };
}

type Account = {
  adminAccountId?: number;
  name: string;
  bankName: string;
  accNo: string;
};

type accountProps = {
  accountDetails: Account;
  id: string;
};

type AccountInitialProps = {
  accHolderName: string;
  accNo: string;
  bankName: string;
};
const AccountEditForm = ({ id, accountDetails }: accountProps) => {
  const EditId = parseInt(id);

  const { accNo, bankName, name } = accountDetails;

  const AccountEditInitialValues: AccountInitialProps = {
    accHolderName: name,
    accNo: accNo,
    bankName: bankName,
  };

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <AccountForm
            editInitialValues={AccountEditInitialValues}
            editId={EditId}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AccountEditForm;
