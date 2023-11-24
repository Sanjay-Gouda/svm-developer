import { Transition } from '@windmill/react-ui';
import Link from 'next/link';
import React, { useState } from 'react';

import { DropdownIcon } from '../../icons';

// function Icon({ icon, ...props }: any) {
//   const Icon = Icons[icon];
//   return <Icon {...props} />;
// }

function SidebarSubmenu({ route }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <li className='relative px-6 py-3' key={route.name}>
      <button
        className='inline-flex w-full items-center justify-between text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
        onClick={handleDropdownMenuClick}
        aria-haspopup='true'
      >
        <span className='inline-flex items-center'>
          {/* <Icon className='h-5 w-5' aria-hidden='true' icon={route.icon} /> */}
          <span className='ml-4'>{route.name}</span>
        </span>
        <DropdownIcon className='h-4 w-4' aria-hidden='true' />
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter='transition-all ease-in-out duration-300'
        enterFrom='opacity-25 max-h-0'
        enterTo='opacity-100 max-h-xl'
        leave='transition-all ease-in-out duration-300'
        leaveFrom='opacity-100 max-h-xl'
        leaveTo='opacity-0 max-h-0'
      >
        <ul
          className='mt-2 space-y-2 overflow-hidden rounded-md bg-gray-50 p-2 text-sm font-medium text-gray-500 shadow-inner dark:bg-gray-900 dark:text-gray-400'
          aria-label='submenu'
        >
          {route.routes.map((r) => (
            <li
              className='px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
              key={r.name}
            >
              <Link className='w-full' to={r.path}>
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </Transition>
    </li>
  );
}

export default SidebarSubmenu;
