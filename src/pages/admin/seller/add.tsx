import { Button, Card, CardBody } from '@windmill/react-ui';

import SectionTitle from '@/components/Typography/SectionTitle';
import { TextInput } from '@/components/ui-blocks';
import Layout from '@/containers/Layout';

export default function AddSeller() {
  return (
    <Layout>
      <Card className='mx-auto w-[60%] p-2'>
        <CardBody>
          <SectionTitle>Add Seller Details</SectionTitle>
          <form className='mb-5 flex flex-col gap-5'>
            <div className='flex justify-between gap-5'>
              <TextInput containerClassName='flex-1' label='First Name' />
              <TextInput containerClassName='flex-1' label='Middle Name' />
              <TextInput containerClassName='flex-1' label='Last Name' />
            </div>
            <TextInput label='Email Address' />
            <TextInput label='Aadhar Card Number' />
          </form>

          <Button size='regular'>Send Invite</Button>
        </CardBody>
      </Card>
    </Layout>
  );
}
