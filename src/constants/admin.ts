import { FaUsers } from 'react-icons/fa';
import { MdHomeFilled, MdInventory2, MdRequestPage } from 'react-icons/md';

interface AdminTabsProps {
  name: string;
  icon: React.FC<any>;

  to: string;
}

export const AdminSidebarTabs: AdminTabsProps[] = [
  {
    name: 'Home',
    to: '',
    icon: MdHomeFilled,
  },
  {
    name: 'Projects',
    to: 'projects',
    icon: MdInventory2,
  },
  {
    name: 'Sellers',
    to: 'sellers',
    icon: FaUsers,
  },
  {
    name: 'Sell Requests',
    to: 'sell-requests',
    icon: MdRequestPage,
  },
];
