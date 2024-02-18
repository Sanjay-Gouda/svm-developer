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
      console.log(list, 'Project');

      if (list && list?.length > 0) {
        const data = list?.map((payload) => ({
          name: payload.name,
          fullName: payload.name,
          id: payload.projectId,
          status: payload.status,
        }));

        setProjectList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return projectList;
};
