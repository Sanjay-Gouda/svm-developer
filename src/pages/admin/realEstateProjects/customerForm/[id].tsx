import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import EditCustomerCollection from '@/components/Customers/EditCustomer/editCustomerCollection';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export async function getServerSideProps(params: any) {
  const EditId = params?.params.id;
  console.log(EditId, '----ID-----');
  const res = await httpInstance.get(`customer/get/${EditId}`);
  const customerDetails = res?.data?.result;

  return {
    props: { EditId, customerDetails },
  };
}

type customerProps = {
  name: string;
  aadharNo: string;
  phone1: string;
  phone2: string;
  pincode: string;
  state: string;
  city: string;
  email: string;
  customerImage: string[];
};

type editCustomerprops = {
  EditId: string;
  customerDetails: customerProps;
};

const EditCustomer = ({ EditId, customerDetails }: editCustomerprops) => {
  const {
    name,
    email,
    phone1,
    phone2,
    city,
    state,
    pincode,
    aadharNo,
    customerImage,
  } = customerDetails;

  const customerEditInitialValues = {
    name: name,
    email: email,
    phone: phone1,
    alternativeNo: phone2,
    aadharNo: aadharNo,
    customerImage: customerImage,
    pincode: pincode,
    city: city,
    state: state,
  };

  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <EditCustomerCollection
              editInitialValues={customerEditInitialValues}
              editId={EditId}
            />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default EditCustomer;
