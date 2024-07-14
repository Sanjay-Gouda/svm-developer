export type TExpanseInitialValues = {
  createdAt: string | any;
  expenseName: string;
  cost: string;
};

export type TExpensePayload = {
  cost: string;
  expenseName: string;
  createdAt: Date;
};
