import { Card, CardBody } from '@windmill/react-ui';
import React, { useState } from 'react';

import AddProjectForm from '@/components/Projects/addProjectForm';
import ProjectImages from '@/components/Projects/projectImages';
import SiteImages from '@/components/Projects/siteImages';
import Layout from '@/containers/Layout';

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
  const [phase, setPhase] = useState<ProjectFormTypes>('form');

  const Component = PhaseComponent[phase];

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          {/* <SectionTitle>Add Project Details</SectionTitle> */}
          <Component onComplete={setPhase} />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default SvmProjects;
