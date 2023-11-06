import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import TestProjects from '@/components/TestProjects';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await httpInstance.get(`project/get/${id}`);

  const projectDetails = res.data.result;

  return {
    props: { id, projectDetails },
  };
}

const EditProject = ({ id, projectDetails }) => {
  // const projectList = useSelector((state) => state.projects.projectList);

  // const getEditFormValues = projectList?.filter(
  //   (list) => list?.projectId === id
  // );

  // console.log(getEditFormValues);

  console.log(projectDetails, 'details');

  const {
    name,
    ownerName,
    address1,
    address2,
    pincode,
    status,
    description,
    unit,
    area,
    downPayment,
    emiAmt,
    totalAmt,
    location,
    logoUrl,
    projectImages,
  } = projectDetails;

  const editInitialValues = {
    name: name,
    ownerName: ownerName,
    // parentProject: 'none',
    area: area,
    pincode: pincode,
    unit: unit,
    emiAmt: emiAmt,
    downPayment: downPayment,
    totalAmt: totalAmt,
    description: description,
    status: status,
    address1: address1,
    logoUrl: logoUrl,
    projectImages: projectImages,
  };

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          {/* <AddProjectForm editInitialValues={editInitialValues} editId={id} /> */}
          <TestProjects editInitialValues={editInitialValues} editId={id} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default EditProject;
