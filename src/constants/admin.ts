import { BsBank2 } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { MdHomeFilled } from 'react-icons/md';
import {
  TbBrandBooking,
  TbBuildingEstate,
  TbFileInvoice,
} from 'react-icons/tb';

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
    icon: TbBuildingEstate,
  },
  {
    name: 'Booking',
    to: 'booking',
    icon: TbBrandBooking,
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
    name: 'Accounts',
    to: 'accounts',
    icon: BsBank2,
  },
  {
    name: 'Expanses',
    to: 'expanses',
    icon: TbFileInvoice,
  },
];
