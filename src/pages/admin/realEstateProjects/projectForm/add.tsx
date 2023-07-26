import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import TestProjects from '@/components/TestProjects';
import Layout from '@/containers/Layout';

export type ProjectFormTypes = 'form' | 'image' | 'siteImages';

// const PhaseComponent: Record<
//   ProjectFormTypes,
//   React.FC<{ onComplete: (type: ProjectFormTypes) => void }>
// > = {
//   form: TestProjects,
//   image: ProjectImages,
//   siteImages: UploadSiteImages,
// };

function SvmProjects() {
  // const [phase, setPhase] = useState<ProjectFormTypes>('form');

  // const Component = PhaseComponent[phase];

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          {/* <SectionTitle>Add Project Details</SectionTitle> */}
          {/* <Component onComplete={setPhase} /> */}
          <TestProjects />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default SvmProjects;
