import React from 'react';

function Main({ children }) {
  return (
    <main className='h-full overflow-y-auto'>
      <div className='container mx-auto grid px-6'>{children}</div>
    </main>
  );
}

export default Main;
