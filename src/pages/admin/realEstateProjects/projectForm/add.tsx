import { Card, CardBody } from '@windmill/react-ui';
import React, { useState } from 'react';

import AddProjectForm from '@/components/Projects/addProjectForm';
import SiteImages from '@/components/Projects/siteImages';
import UploadProjectImages from '@/components/Projects/uploadProjectImages';
import Layout from '@/containers/Layout';

export type ProjectFormTypes = 'form' | 'image' | 'siteImages';

const PhaseComponent: Record<
  ProjectFormTypes,
  React.FC<{ onComplete: (type: ProjectFormTypes) => void }>
> = {
  form: AddProjectForm,
  image: UploadProjectImages,
  siteImages: SiteImages,
};

function SvmProjects() {
  const [phase, setPhase] = useState<ProjectFormTypes>('image');

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
