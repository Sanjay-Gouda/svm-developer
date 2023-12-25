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

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'UPCOMING';

export type TProjectResponse = {
  projectId?: string;
  name: string;
  description: string | null;
  ownerName: string;
  area: number;
  unit: string;
  status: ProjectStatus;
  address1: string;
  address2: string | null;
  pincode: string;
  location: string;
  downPayment: number;
  emiAmt: number;
  totalAmt: number;
};
