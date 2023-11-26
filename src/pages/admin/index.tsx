import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import InfoCard from '@/components/Cards/InfoCard';
import RecentCard from '@/components/RecentCard/recentCard';
import RoundIcon from '@/components/RoundIcon';
import Layout from '@/containers/Layout';

import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '@/icons';

// import ChartLegend from '../../components/Chart/ChartLegend'

const recentCustomer = [
  {
    id: 1,
    dp: '	https://flowbite.com/docs/images/people/profile-picture-1.jpg',
    name: 'Sanjay',
    email: 'email@windster.com',
  },
  {
    id: 2,
    dp: '	https://flowbite.com/docs/images/people/profile-picture-2.jpg',
    name: 'Vikram',
    email: 'email@windster.com',
  },
  {
    id: 3,
    dp: '	https://flowbite.com/docs/images/people/profile-picture-3.jpg',
    name: 'Rahul',
    email: 'email@windster.com',
  },
  {
    id: 4,
    dp: '	https://flowbite.com/docs/images/people/profile-picture-4.jpg',
    name: 'Josh',
    email: 'email@windster.com',
  },
  {
    id: 5,
    dp: '	https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'Michel',
    email: 'email@windster.com',
  },
];

const latestProjects = [
  {
    id: 1,
    name: 'Sai Recendecy',
    status: 'Upcomming',
    email: 'Sachin',
  },
  {
    id: 2,
    name: 'Hall Town',
    status: 'Active',
    email: 'Olpard',
  },
  {
    id: 3,
    name: 'Glorniaa Valley',
    status: 'Completed',
    email: 'Vesu',
  },
  {
    id: 4,
    name: 'Sachin Square',
    status: 'Upcomming',
    email: 'Vadodra',
  },
  {
    id: 5,
    name: 'Umang',
    status: 'Completed',
    email: 'Bharuch',
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);
  console.log({ cookies });
  return (
    <Layout pageTitle='Dashboard'>
      <div className='mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        <InfoCard title='Total Clients' value='6389'>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass='text-orange-500 dark:text-orange-100'
            bgColorClass='bg-orange-100 dark:bg-orange-500'
            className='mr-4'
          />
        </InfoCard>

        <InfoCard title='Total Projects' value='499'>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass='text-green-500 dark:text-green-100'
            bgColorClass='bg-green-100 dark:bg-green-500'
            className='mr-4'
          />
        </InfoCard>

        <InfoCard title='Current Bookings' value='376'>
          <RoundIcon
            icon={CartIcon}
            iconColorClass='text-blue-500 dark:text-blue-100'
            bgColorClass='bg-
            blue-100 dark:bg-blue-500'
            className='mr-4'
          />
        </InfoCard>
        {/* <InfoCard title='Active Projects' value='376'>
          <RoundIcon
            icon={CartIcon}
            iconColorClass='text-blue-500 dark:text-blue-100'
            bgColorClass='bg-blue-100 dark:bg-blue-500'
            className='mr-4'
          />
        </InfoCard> */}

        <InfoCard title='Completed Projects' value='35'>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass='text-teal-500 dark:text-teal-100'
            bgColorClass='bg-teal-100 dark:bg-teal-500'
            className='mr-4'
          />
        </InfoCard>
      </div>

      <div className='flex justify-between gap-3'>
        <RecentCard
          cardTitle='Recent Customers'
          isStatus={false}
          viewAll={() => {
            router.push('admin/customers');
          }}
          customerList={recentCustomer}
        />
        <RecentCard
          cardTitle='Latest Projects'
          isStatus={true}
          customerList={latestProjects}
          viewAll={() => {
            router.push('admin/projects');
          }}
        />
        <RecentCard
          isStatus={true}
          cardTitle='Current Bookings'
          viewAll={() => {
            router.push('admin/booking');
          }}
          customerList={latestProjects}
        />
      </div>
    </Layout>
  );
}
