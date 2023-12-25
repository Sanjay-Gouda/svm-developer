import { useState } from 'react';

import Stepper from '@/components/Stepper/Stepper';
import TestProjects from '@/components/TestProjects/CreateProject';
import PlanningImage from '@/components/TestProjects/Images/planningImage';
import ProjectLogo from '@/components/TestProjects/Images/projectLogo';
import SiteImage from '@/components/TestProjects/Images/siteImage';
import { TCreateProject } from '@/components/TestProjects/types';

const ProjectCollection = () => {
  const steps = [
    'Project Info',
    'Project Logo',
    'Planning Images',
    'Site Images',
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const [projectFormValues, setProjectFormValues] = useState<TCreateProject>();

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      return currentStep;
      // setCurrentStep((prev) => prev - 1);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    setComplete(true);
  };

  return (
    <>
      <div className='flex items-center justify-center'>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          complete={complete}
          handleNextStep={handleNextStep}
          handleComplete={handleComplete}
        />
      </div>

      {currentStep === 1 ? (
        <TestProjects
          setProjectFormValues={setProjectFormValues}
          handleNextStep={handleNextStep}
        />
      ) : currentStep === 2 ? (
        <ProjectLogo
          handleNextStep={handleNextStep}
          handleBack={handleBack}
          projectId={projectFormValues?.projectId || ''}
        />
      ) : currentStep === 3 ? (
        <PlanningImage
          handleNextStep={handleNextStep}
          projectId={projectFormValues?.projectId || ''}
        />
      ) : (
        <SiteImage
          handleNextStep={handleNextStep}
          projectId={projectFormValues?.projectId || ''}
        />
      )}
    </>
  );
};

export default ProjectCollection;
