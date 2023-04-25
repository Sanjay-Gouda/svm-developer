import React, { useState } from 'react';

function AccessibleNavigationAnnouncer() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   // ignore the /
  //   if (location.pathname.slice(1)) {
  //     // make sure navigation has occurred and screen reader is ready
  //     setTimeout(
  //       () => setMessage(`Navigated to ${location.pathname.slice(1)} page.`),
  //       500
  //     );
  //   } else {
  //     setMessage('');
  //   }
  // }, [location]);

  return (
    <span
      className='sr-only'
      role='status'
      aria-live='polite'
      aria-atomic='true'
    >
      {message}
    </span>
  );
}

export default AccessibleNavigationAnnouncer;
