import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import ExpanseForm from '@/components/Expanse/expanseForm';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps = async (params) => {
  const editId = params?.params.id;
  const res = await httpInstance.get(`expense/get/${editId}`);
  const details = res?.data?.result;
  return {
    props: { editId, details },
  };
};

type miscexpenseProps = {
  expenseName: string;
  cost: undefined | number;
}[];

type projectProps = {
  id: string;
  projectName: string;
};

type payloadProps = {
  brokrage: string;
  landDevelopment: string;
  landPurchase: string;
  landVisit: string;
  miscExpense: miscexpenseProps;
  nonAgriculture: string;
  planningLayout: string;
  projectName: projectProps;
};

const EditExapnseDetails = ({ editId, details }) => {
  const { expense, miscExpense, projectName } = details;

  const {
    brokerage,
    landDevelopment,
    landPurchase,
    landVisitCharge,
    nonAgricultural,
    planningAndLayout,
    expenseId,
    projectId,
  } = expense;

  const miscExpenseList = miscExpense.map(({ expenseName, cost }) => ({
    expenseName,
    cost,
  }));

  const editProject = {
    id: projectId,
    name: projectName,
  };

  const EditInitialValues = {
    projectName: editProject,
    landPurchase: landPurchase,
    nonAgriculture: nonAgricultural,
    brokrage: brokerage,
    planningLayout: planningAndLayout,
    landVisit: landVisitCharge,
    landDevelopment: landDevelopment,
  };

  // const editMiscExpeses = {

  // }

  return (
    <Layout>
      <Card>
        <CardBody>
          <ExpanseForm
            editId={expenseId}
            EditInitialValues={EditInitialValues}
            miscExpenseList={miscExpenseList}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default EditExapnseDetails;
