import { Pagination } from '@windmill/react-ui';
import React, { FC } from 'react';

import { TPaginationProps } from '@/components/Pagination/types';
const SvmPagination: FC<TPaginationProps> = ({
  onChange,
  resultsPerPage,
  totalResults,
}) => {
  return (
    <Pagination
      totalResults={totalResults}
      resultsPerPage={resultsPerPage}
      onChange={onChange}
      label='Page navigation'
    />
  );
};

export default SvmPagination;
