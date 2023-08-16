import React, { PropsWithChildren, useState } from 'react';

import { Header } from '@/components/Header';
import PageTitle from '@/components/Typography/PageTitle';
import { TextInput } from '@/components/ui-blocks';

import Main from './Main';
import Sidebar from '../components/Sidebar';

interface LayoutProps {
  right?: React.ReactNode;
  pageTitle?: string;
  isShowSearchBar?: boolean;
  handleSearch?: (e: any) => void;
}
function Layout({
  children,
  right,
  handleSearch,
  pageTitle,
  isShowSearchBar,
}: PropsWithChildren<LayoutProps>) {
  // const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const isSidebarOpen = true;
  // useEffect(() => {
  //   closeSidebar();
  // }, []);

  return (
    <div
      className={` flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && 'overflow-hidden'
      }`}
    >
      <Sidebar />

      <div className='flex w-full flex-1 flex-col'>
        <Header />
        <Main>
          {/* <div className='flex flex-c'>

          </div> */}
          <div className='flex items-center justify-between'>
            <PageTitle>{pageTitle}</PageTitle>

            {/* {right && right} */}
          </div>
          <div className=' mb-6 flex items-center justify-between'>
            <div className='flex w-[25%] justify-start '>
              {isShowSearchBar && (
                <TextInput
                  type='text'
                  name='placeholder'
                  placeholder='search'
                  label=''
                  containerClassName='w-full'
                  onChange={handleSearch}
                />
              )}
            </div>

            {right && right}
          </div>
          {children}
        </Main>
      </div>
    </div>
  );
}

export default Layout;
