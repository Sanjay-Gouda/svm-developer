import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';
import { useSelector } from 'react-redux';

import AddProjectForm from '@/components/Projects/addProjectForm';
import Layout from '@/containers/Layout';

export async function getServerSideProps(context) {
  const id = context.params.id;

  return {
    props: { id },
  };
}

const EditProject = ({ id }) => {
  const projectList = useSelector((state) => state.projects.projectList);

  const getEditFormValues = projectList?.filter(
    (list) => list?.projectId === id
  );

  console.log(getEditFormValues);

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
  } = getEditFormValues[0];

  const editInitialValues = {
    name: name,
    ownerName: ownerName,
    // parentProject: 'none',
    area: area,
    pincode: pincode,
    unit: unit,
    // state: '',
    // dist: '',
    description: description,
    status: status,
    address1: address1,
  };

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <AddProjectForm editInitialValues={editInitialValues} editId={id} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default EditProject;
