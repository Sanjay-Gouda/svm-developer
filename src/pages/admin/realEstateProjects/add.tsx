import SectionTitle from '@/components/Typography/SectionTitle';
import AddProjectAddress from '@/components/svmprojects/addProjectAddress';
import AddProjectForm from '@/components/svmprojects/addProjectForm';
import ProjectImages from '@/components/svmprojects/projectImages';
import SiteImages from '@/components/svmprojects/siteImages';
import Layout from '@/containers/Layout';
import { Card, CardBody } from '@windmill/react-ui';
import React, { useState } from 'react';

export type ProjectFormTypes = 'form' | 'image' | 'siteImages';

const PhaseComponent: Record<
  ProjectFormTypes,
  React.FC<{ onComplete: (type: ProjectFormTypes) => void }>
> = {
  form: AddProjectForm,
  image: ProjectImages,
  siteImages: SiteImages,
};

function SvmProjects() {
  const [phase, setPhase] = useState<ProjectFormTypes>('image');

  const Component = PhaseComponent[phase];

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <SectionTitle>Add Project Details</SectionTitle>
          <Component onComplete={setPhase} />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default SvmProjects;
