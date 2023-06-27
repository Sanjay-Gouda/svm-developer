import axios from 'axios';
import { useEffect, useState } from 'react';

import { API_ENDPOINT } from '@/const/APIRoutes';

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
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}project/list`,
    })
      .then((res) => {
        const list = res?.data?.result?.list;

        if (list && list?.length > 0) {
          const data = list?.map((payload) => ({
            name: payload.name,
            id: payload.projectId,
          }));

          setProjectList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return projectList;
};
