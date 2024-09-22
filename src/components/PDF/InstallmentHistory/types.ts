export type TinstallMentList = {
  installmentId: string;
  bookingId: string;
  amount: number;
  paymentType: string;
  installmentNo: number;
  adminAccountId: any;
  penalty: number;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  customer: any;
};

export type installmentListProps = {
  installmentList: TinstallMentList[];
};
