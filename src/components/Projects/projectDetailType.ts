export type TDetailValues = {
  name: string;
  ownerName: string;
  parentProject: string;
  area: number | undefined | string;
  pincode: number | undefined;
  state: string;
  dist: string;
  unit: string;
  status: string;
  address1: string | undefined;
  address2?: string | undefined;
  description?: string | undefined;
  planningImageFormData?: string[];
  siteImageFromData?: string[];
  emiAmt: number | undefined;
  downPayment: number | undefined;
  totalAmt: number | undefined;
  location: string;
};

export type TPlanningState = TDetailValues & {
  planningImages: { name: string; size: number; imageId: number }[];
  siteImages: { name: string; size: number; imageId: number }[];
};
