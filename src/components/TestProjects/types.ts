export type TCreateProject = {
  name: string;
  description?: string | undefined;
  parentId?: string | undefined;
  ownerName: string;
  area?: number | string;
  unit: string;
  status: string;
  address1?: string;
  address2?: string;
  pincode?: number;
  emiAmt: number;
  downPayment: number;
  totalAmt: number;
  location: string;
  projectId?: string;
};
