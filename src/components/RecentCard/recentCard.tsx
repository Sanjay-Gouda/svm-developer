import { Badge } from '@windmill/react-ui';

const RecentCard = ({ cardTitle, details, isStatus, viewAll }) => {
  return (
    <>
      <div className='w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-8 dark:border-gray-700 dark:bg-gray-800'>
        <div className='mb-4 flex items-center justify-between'>
          <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
            {cardTitle}
          </h5>

          <p
            onClick={viewAll}
            className='cursor-pointer text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
          >
            View all
          </p>
        </div>
        <div className='flow-root'>
          <ul
            role='list'
            className='divide-y divide-gray-200 dark:divide-gray-700'
          >
            {details?.map((list) => {
              return (
                <li className='py-3 sm:py-4' key={list.id}>
                  <div className='flex items-center space-x-4'>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                        {list.name}
                      </p>
                      {list.email && (
                        <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                          {list.email}
                        </p>
                      )}
                    </div>

                    <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                      {isStatus && (
                        <Badge
                          type={
                            list?.status === 'Upcomming'
                              ? 'primary'
                              : list?.status === 'Active'
                              ? 'neutral'
                              : 'success'
                          }
                        >
                          {list?.status}
                        </Badge>
                      )}
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
