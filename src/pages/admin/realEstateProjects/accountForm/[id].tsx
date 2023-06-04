import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';
import { useSelector } from 'react-redux';

import AccountForm from '@/components/Accounts/accountForm';
import Layout from '@/containers/Layout';

export async function getServerSideProps(params: any) {
  const id = params.params.id;

  return {
    props: { id },
  };
}

interface Account {
  adminAccountId?: number;
  name: string;
  bankName: string;
  accNo: string;
}

interface RootState {
  accounts: {
    accountList: Account[];
  };
}

const AccountEditForm = ({ id }: any) => {
  const EditId = parseInt(id);
  /* AccountList from the Store */
  const accountList: Account[] = useSelector<RootState, Account[]>(
    (state) => state.accounts.accountList
  );

  const getEditFormValues = accountList?.filter(
    (accounts) => accounts?.adminAccountId === EditId
  );

  const { name, bankName, accNo } = getEditFormValues[0];

  const AccountEditInitialValues: any = {
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
