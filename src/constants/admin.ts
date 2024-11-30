import { BsBank2 } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { MdHomeFilled } from 'react-icons/md';
import {
  TbBrandBooking,
  TbBuildingEstate,
  TbFileInvoice,
} from 'react-icons/tb';

interface AdminTabsProps {
  name: string;
  icon: React.FC<any>;
  to: string;
  routes?: any;
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
    name: 'Customers',
    to: 'customers',
    icon: FaUsers,
  },
  // {
  //   name: 'Happy Customers',
  //   to: 'happyCustomers',
  //   icon: FaUsers,
  // },

  {
    name: 'Accounts',
    to: 'accounts',
    icon: BsBank2,
  },
  {
    name: 'Booking',
    to: 'booking',
    icon: TbBrandBooking,
  },
  // {
  //   name: 'Installment',
  //   to: 'installment',
  //   icon: TbFileInvoice,
  // },

  // {
  //   name: 'Referral',
  //   to: 'referral',
  //   icon: MoneyIcon,
  // },

  {
    name: 'Project Expenses',
    to: 'expanses',
    icon: TbFileInvoice,
  },
  // {
  //   name: 'Monthly Expenses',
  //   to: 'monthlyExpenses',
  //   icon: TbFileInvoice,
  // },
  // {
  //   name: 'Festival',
  //   to: 'festival',
  //   icon: MdTempleHindu,
  // },

  // {
  //   name: 'Users',
  //   to: 'users/manageUser',
  //   icon: FaUserCog,
  // },
  // {
  //   name: 'Roles',
  //   to: 'Roles/manageRoles',
  //   icon: HiCircleStack,
  // },
];
