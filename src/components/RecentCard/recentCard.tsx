import { Badge } from '@windmill/react-ui';

const RecentCard = ({ cardTitle, customerList }) => {
  return (
    <>
      <div className='w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8'>
        <div className='mb-4 flex items-center justify-between'>
          <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
            {cardTitle}
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
            {customerList?.map((list) => {
              return (
                <li className='py-3 sm:py-4' key={list.id}>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <img
                        className='h-8 w-8 rounded-full'
                        src={list.dp}
                        alt='Neil image'
                      />
                      {/* <HomeIcon/> */}
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                        {list.name}
                      </p>
                      <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                        {list.email}
                      </p>
                    </div>

                    <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                      {/* $320 */}
                      <Badge type='primary'>Upcoming</Badge>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecentCard;
