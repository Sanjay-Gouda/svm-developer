import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

import SidebarSubmenu from '@/components/Sidebar/SidebarSubmenu';

import { AdminSidebarTabs } from '@/constants/admin';

// function Icon({ icon, ...props }) {
//   const Icon = Icons[icon];
//   return <Icon {...props} />;
// }

function SidebarContent() {
  return (
    <div className='py-4 text-gray-500 dark:text-gray-400'>
      <a
        className='ml-6 text-lg font-bold text-gray-800 dark:text-gray-200'
        href='#'
      >
        SVM DEVELOPERS
      </a>
      <ul className='mt-6'>
        {AdminSidebarTabs.map((tab, index) => (
          <>
            {tab.routes ? (
              <SidebarSubmenu route={tab} key={index} />
            ) : (
              <SideTab key={index} tab={tab} />
            )}
          </>
        ))}
      </ul>
    </div>
  );
}

const SideTab: FC<{ tab: (typeof AdminSidebarTabs)[number] }> = ({ tab }) => {
  const segments = usePathname()?.split('/');

  const lastSegment = segments ? segments[segments.length - 1] : '';

  const active =
    lastSegment === tab.to || (tab.to === '' && lastSegment === 'admin');

  return (
    <li
      className={`relative border-l-4 border-transparent px-6 py-3 ${
        active && ' border-purple-600 bg-purple-50 dark:bg-gray-700'
      }`}
    >
      <Link
        href={`/admin/${tab.to}`}
        className={` ${
          active && '  text-purple-800 dark:text-gray-100'
        } inline-flex w-full items-center text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`}
        // activeClassName=''
      >
        <tab.icon
          className='h-5 w-5'
          aria-hidden='true'
          size={20}
          //icon={route.icon}
        />
        <span className='ml-4'>{tab.name}</span>
      </Link>
    </li>
  );
};

{
  /* {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className='relative px-6 py-3' key={route.name}>
              <NavLink
                exact
                to={route.path}
                className='inline-flex w-full items-center text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                activeClassName='text-gray-800 dark:text-gray-100'
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className='absolute inset-y-0 left-0 w-1 rounded-br-lg rounded-tr-lg bg-purple-600'
                    aria-hidden='true'
                  ></span>
                </Route>
                <Icon
                  className='h-5 w-5'
                  aria-hidden='true'
                  icon={route.icon}
                />
                <span className='ml-4'>{route.name}</span>
              </NavLink>
            </li>
          )
        )} */
}

export default SidebarContent;
