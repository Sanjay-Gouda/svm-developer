export type TReceipt = {
  amount: number;
  bankPayment: unknown[];
  cashPayment: unknown[];
  chequePayment: unknown[];
  createdAt: string;
  customer: unknown[];
  installmentId: string;
  installmentNo: number;
  paymentType: string;
  penalty: number;
  plotNo: string;
  projectLogo: string;
  upiPayment: unknown[];
};
