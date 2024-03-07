import { Avatar, Badge, Dropdown, DropdownItem } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import { useDisplayPref } from '@/hooks/useDarkMode';

import {
  BellIcon,
  MenuIcon,
  MoonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
  OutlinePersonIcon,
  SunIcon,
} from '@/icons';

export const Header = () => {
  const routes = useRouter();
  const [, , removeCookie] = useCookies(['token']);

  // const { mode, toggleMode } = useContext(WindmillContext);
  // const { toggleSidebar } = useContext(SidebarContext);

  const { mode, toggleMode } = useDisplayPref();
  const toggleSidebar = () => {};

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const handleLogout = () => {
    // removeCookie('token', {});
    removeCookie('token', { path: '/' });
    localStorage.removeItem('loginToken');

    routes.push('/');

    // const isLoginCookie = document?.cookie?.split('=')?.[1];
    // const token = document.cookie.get('token');
  };

  return (
    <header className='shadow-bottom z-40 bg-white py-4 dark:bg-gray-800'>
      <div className='container mx-auto flex h-full items-center justify-between px-6 text-purple-600 dark:text-purple-300'>
        {/* <!-- Mobile hamburger --> */}
        <button
          className='focus:shadow-outline-purple -ml-1 mr-5 rounded-md p-1 focus:outline-none lg:hidden'
          onClick={toggleSidebar}
          aria-label='Menu'
        >
          <MenuIcon className='h-6 w-6' aria-hidden='true' />
        </button>
        {/* <!-- Search input --> */}
        <div className='flex flex-1 justify-center lg:mr-32'>
          <div className='relative mr-6 w-full max-w-xl focus-within:text-purple-500'>
            <div className='absolute inset-y-0 flex items-center pl-2'>
              {/* <SearchIcon className='h-4 w-4' aria-hidden='true' /> */}
            </div>
            {/* <Input
              className='pl-8 text-gray-700'
              placeholder='Search for projects'
              aria-label='Search'
            /> */}
          </div>
        </div>
        <ul className='flex flex-shrink-0 items-center space-x-6'>
          {/* <!-- Theme toggler --> */}
          <li className='flex'>
            <button
              className='focus:shadow-outline-purple rounded-md focus:outline-none'
              onClick={toggleMode}
              aria-label='Toggle color mode'
            >
              {mode === 'dark' ? (
                <SunIcon className='h-5 w-5' aria-hidden='true' />
              ) : (
                <MoonIcon className='h-5 w-5' aria-hidden='true' />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className='relative'>
            <button
              className='focus:shadow-outline-purple relative rounded-md align-middle focus:outline-none'
              onClick={handleNotificationsClick}
              aria-label='Notifications'
              aria-haspopup='true'
            >
              <BellIcon className='h-5 w-5' aria-hidden='true' />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden='true'
                className='absolute right-0 top-0 inline-block h-3 w-3 -translate-y-1 translate-x-1 transform rounded-full border-2 border-white bg-red-600 dark:border-gray-800'
              ></span>
            </button>

            <Dropdown
              align='right'
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag='a' href='#' className='justify-between'>
                <span>Messages</span>
                <Badge type='danger'>13</Badge>
              </DropdownItem>
              <DropdownItem tag='a' href='#' className='justify-between'>
                <span>Sales</span>
                <Badge type='danger'>2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className='relative'>
            <button
              className='focus:shadow-outline-purple rounded-full focus:outline-none'
              onClick={handleProfileClick}
              aria-label='Account'
              aria-haspopup='true'
            >
              <Avatar
                className='align-middle'
                src='https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82'
                alt=''
                aria-hidden='true'
              />
            </button>
            <Dropdown
              align='right'
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag='a' href='#'>
                <OutlinePersonIcon
                  className='mr-3 h-4 w-4'
                  aria-hidden='true'
                />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem tag='a' href='#'>
                <OutlineCogIcon className='mr-3 h-4 w-4' aria-hidden='true' />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <OutlineLogoutIcon
                  className='mr-3 h-4 w-4'
                  aria-hidden='true'
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
};
