export type activeTabState = {
  info: boolean;
  images: boolean;
};

export type TEditResponse = {
  editInitialValues: any;
  editId: string;
};

export type TModal = {
  passphotoModal: boolean;
  aadharCardModal: boolean;
  panCardModal: boolean;
};

export type TCustomerImage = {
  createdAt: string;
  customerId: string;
  customerImageId: string;
  imageUrl: string;
  type: string;
  updatedAt: string;
};

export type Tdocument = {
  PHOTO: string;
  AADHAR_FRONT: string;
  AADHAR_REAR: string;
  PAN: string;
};
