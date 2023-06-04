import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';
import { useSelector } from 'react-redux';

import CustomerForm from '@/components/Customers/customerForm';
import Layout from '@/containers/Layout';

export async function getServerSideProps(params: any) {
  const EditId = params?.params.id;
  return {
    props: { EditId },
  };
}

const EditCustomer = ({ EditId }) => {
  console.log(EditId, 'Edit id');

  const customers = useSelector((state) => state.customers.customerList);

  const getEditFormValues = customers?.filter(
    (customers) => customers?.customerId === EditId
  );

  const { firstName, lastName, email, phone, aadharNo } = getEditFormValues[0];

  const customerEditInitialValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    aadharNo: aadharNo,
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
