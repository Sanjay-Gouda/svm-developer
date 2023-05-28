import InfoCard from '@/components/Cards/InfoCard';
import RoundIcon from '@/components/RoundIcon';
import Layout from '@/containers/Layout';

import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '@/icons';

export default function Dashboard() {
  return (
    <Layout>
      <div className='mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        <InfoCard title='Total clients' value='6389'>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass='text-orange-500 dark:text-orange-100'
            bgColorClass='bg-orange-100 dark:bg-orange-500'
            className='mr-4'
          />
        </InfoCard>

        <InfoCard title='Total Projects' value='$ 46,760.89'>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass='text-green-500 dark:text-green-100'
            bgColorClass='bg-green-100 dark:bg-green-500'
            className='mr-4'
          />
        </InfoCard>

        <InfoCard title='Active Projects' value='376'>
          <RoundIcon
            icon={CartIcon}
            iconColorClass='text-blue-500 dark:text-blue-100'
            bgColorClass='bg-blue-100 dark:bg-blue-500'
            className='mr-4'
          />
        </InfoCard>

        <InfoCard title='Completed Projects' value='35'>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass='text-teal-500 dark:text-teal-100'
            bgColorClass='bg-teal-100 dark:bg-teal-500'
            className='mr-4'
          />
        </InfoCard>
      </div>
    </Layout>
  );
}
