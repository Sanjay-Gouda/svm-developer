import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import ReferrerForm from '@/components/Referrer/referrerForm';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export async function getServerSideProps(params: any) {
  const id = params.params.id;
  const res = await httpInstance.get(`referral/get/${id}`);
  const referralDetails = res?.data?.result;

  return {
    props: {
      id,
      referralDetails,
    },
  };
}

type formProps = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  referralId?: string;
};

type editFormProps = {
  referralDetails: formProps;
  id: string;
};

const RefferEditForm = ({ id, referralDetails }: editFormProps) => {
  const { firstName, lastName, phone, address, email } = referralDetails;

  const EditInitialValues: formProps = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    address: address,
    email: email,
  };

  // setEditRefferData(getEditableReferralList);

  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <ReferrerForm editList={EditInitialValues} editId={id} />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default RefferEditForm;
