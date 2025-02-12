export type customerNameProps = {
  id?: string;
  name?: string;
}[];

export type TBookingProps = {
  customerName: customerNameProps;
  projectName: customerNameProps;
  bankAccount: customerNameProps;
  area: number;
  plotNo: number;
  // landmark: string;
  // pincode: undefined | number;
  // address: string;
  // state: string;
  // city: string;
  // totalAmt: undefined | number;
  totalAmt: any;
  paidAmt: any;
  remainingAmt: any;
  noOfInstallment: undefined | number;
  amtPerInstallment: undefined | number;
  paymentId: any;

  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'CHEQUE' | 'UPI';
  paymentStatus: 'PENDING' | 'IN PROGRESS' | 'COMPLETED';
  dastavejAmt: number;
  cheuqeNo: undefined | number;
  /* C->Cheque */
  cBankName: string;

  UPIId: string;
  emiDate: Date;
  reminderDate: Date;

  /* BT -BankTransfer */
  BTAcNo: undefined | number;
  BTBankName: string;
};
