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

export default function Dashboard() {
  return (
    <Layout>
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
            bgColorClass='bg-blue-100 dark:bg-blue-500'
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
      {/* <Card className='w-1/2 p-2'>
        <div className='w-full'>
          <p className='text-xl text-teal-500 dark:text-teal-100'>
            Recent Projects
          </p>
        </div>
        <div className='mt-3 flex justify-between'>
          <div>
            <p className=' text-base  text-gray-200 transition-colors duration-150'>
              Project Name
            </p>
          </div>
          <div>
            <p className=' text-base  text-gray-200 transition-colors duration-150'>
              City
            </p>
          </div>
          <div>
            <p className=' text-base  text-gray-200 transition-colors duration-150'>
              Status
            </p>
          </div>
        </div>
      </Card> */}

      {/* <div className='w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8'>
        <div className='mb-4 flex items-center justify-between'>
          <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
            Latest Customers
          </h5>
          <a
            href='#'
            className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
          >
            View all
          </a>
        </div>
        <div className='flow-root'>
          <ul
            role='list'
            className='divide-y divide-gray-200 dark:divide-gray-700'
          >
            <li className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='/docs/images/people/profile-picture-1.jpg'
                    alt='Neil image'
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                    Neil Sims
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    email@windster.com
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  $320
                </div>
              </div>
            </li>
            <li className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='/docs/images/people/profile-picture-3.jpg'
                    alt='Bonnie image'
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                    Bonnie Green
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    email@windster.com
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  $3467
                </div>
              </div>
            </li>
            <li className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='/docs/images/people/profile-picture-2.jpg'
                    alt='Michael image'
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                    Michael Gough
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    email@windster.com
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  $67
                </div>
              </div>
            </li>
            <li className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='/docs/images/people/profile-picture-4.jpg'
                    alt='Lana image'
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                    Lana Byrd
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    email@windster.com
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  $367
                </div>
              </div>
            </li>
            <li className='pb-0 pt-3 sm:pt-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='/docs/images/people/profile-picture-5.jpg'
                    alt='Thomas image'
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                    Thomes Lean
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    email@windster.com
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  $2367
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div> */}

      <div className='flex justify-between gap-3'>
        <RecentCard
          cardTitle='Recent Customers'
          customerList={recentCustomer}
        />
        <RecentCard cardTitle='Latest Projects' customerList={recentCustomer} />
        <RecentCard
          cardTitle='Current Bookings'
          customerList={recentCustomer}
        />
      </div>
    </Layout>
  );
}
