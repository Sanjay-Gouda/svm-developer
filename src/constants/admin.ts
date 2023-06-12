import { FaUsers } from 'react-icons/fa';
import { MdHomeFilled, MdInventory2 } from 'react-icons/md';

import { MoneyIcon } from '@/icons';

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
    name: 'Booking',
    to: 'booking',
    icon: MdInventory2,
  },
  {
    name: 'Customers',
    to: 'customers',
    icon: FaUsers,
  },
  {
    name: 'Referral',
    to: 'referral',
    icon: MoneyIcon,
  },
  {
    name: 'My Accounts',
    to: 'accounts',
    icon: FaUsers,
  },
];
