import React, { PropsWithChildren } from 'react';

import { Header } from '@/components/Header';
import PageTitle from '@/components/Typography/PageTitle';

import Main from './Main';
import Sidebar from '../components/Sidebar';

interface LayoutProps {
  right?: React.ReactNode;
}
function Layout({ children, right }: PropsWithChildren<LayoutProps>) {
  // const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);

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
          <div className='flex items-center justify-between'>
            <PageTitle>Dashboard</PageTitle>

            {right && right}
          </div>
          {children}
        </Main>
      </div>
    </div>
  );
}

export default Layout;
