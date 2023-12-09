import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import CustomerForm from '@/components/Customers/customerForm';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export async function getServerSideProps(params: any) {
  const EditId = params?.params.id;
  const res = await httpInstance.get(`customer/get/${EditId}`);
  const customerDetails = res?.data?.result;

  console.log(customerDetails);

  return {
    props: { EditId, customerDetails },
  };
}

type customerProps = {
  firstName: string;
  lastName: string;
  aadharNo: string;
  phone: string;
  email: string;
};

type editCustomerprops = {
  EditId: string;
  customerDetails: customerProps;
};

const EditCustomer = ({ EditId, customerDetails }: editCustomerprops) => {
  console.log(EditId, 'editId');
  const { firstName, lastName, email, phone, aadharNo, customerImage } =
    customerDetails;

  const customerEditInitialValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    aadharNo: aadharNo,
    customerImage: customerImage,
  };

  return (
    <>
      <Layout>
        <Card className='mx-auto  w-full p-2'>
          <CardBody>
            <CustomerForm
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
