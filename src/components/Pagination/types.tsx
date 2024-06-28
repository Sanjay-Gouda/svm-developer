export type TPaginationProps = {
  onChange: (pageNumber: number) => void;
  totalResults: number;
  resultsPerPage: number;
};
