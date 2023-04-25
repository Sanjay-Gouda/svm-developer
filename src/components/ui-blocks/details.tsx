export const Details = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex flex-col'>
      <span className='text-md font-medium text-gray-600 dark:text-gray-400'>
        {label}
      </span>
      <span className='text-md dark:text-gray-300'>{value}</span>
    </div>
  );
};
