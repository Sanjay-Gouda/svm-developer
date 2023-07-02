import { useEffect, useState } from 'react';

import { httpInstance } from '@/constants/httpInstances';

type projectProps = {
  id: string;
  name: string;
}[];

export const useProjectDetails = () => {
  const [projectList, setProjectList] = useState<projectProps>([]);

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    try {
      const res = await httpInstance.get(`project/list`);
      const list = res?.data?.result?.list;

      if (list && list?.length > 0) {
        const data = list?.map((payload) => ({
          name: payload.name,
          id: payload.projectId,
        }));

        setProjectList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return projectList;
};
