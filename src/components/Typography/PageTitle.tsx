import React from 'react';

function PageTitle({ children }) {
  return (
    <h1 className='my-6 text-2xl font-semibold text-black dark:text-gray-200'>
      {children}
    </h1>
  );
}

export default PageTitle;
