import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';
import { useSelector } from 'react-redux';

import ReferrerForm from '@/components/Referrer/referrerForm';
import Layout from '@/containers/Layout';
type formProps = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  referralId?: string;
};

export async function getServerSideProps(params: any) {
  const id = params.params.id;

  return {
    props: {
      id: id,
    },
  };
}

const RefferEditForm = ({ id }) => {
  const refferList: any = useSelector<any>((state) => state.referrals.list);

  // const [editRefferData, setEditRefferData] = useState<formProps[]>([]);

  const getEditableReferralList = refferList?.filter((list: formProps) => {
    if (list?.referralId === id) {
      return list;
    }
  });

  const { firstName, lastName, phone, address, email } =
    getEditableReferralList[0];

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
