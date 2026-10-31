import type { ChangeEvent, FC } from 'react';
import { DOTS, usePagination } from './usePagination';
import { IconSvg } from '../IconSvg/IconSvg';
import chevronLeft from '../../../../../assets/icons/chevron-left.svg';
import chevronRight from '../../../../../assets/icons/chevron-right.svg';
import s from './Pagination.module.css';
import SelectField from '../SelectField/SelectField';

type PaginationPropsType = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export const Pagination: FC<PaginationPropsType> = ({
  currentPage,
  pageSize,
  totalCount,
  siblingCount = 2,
  onPageChange,
  onPageSizeChange,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const onPreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const onPageSizeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(+e.target.value);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={s['pagination']}>
      <button onClick={onPreviousClick} disabled={currentPage === 1}>
        <IconSvg src={chevronLeft} size={8} />
      </button>

      <ul>
        {paginationRange.map((pageNumber) => {
          return (
            <li key={`page-${pageNumber}`}>
              {pageNumber === DOTS ? (
                <span className={s.dots}>&#8230;</span>
              ) : (
                <button
                  className={pageNumber === currentPage ? s['selected-page'] : undefined}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <button onClick={onNextClick} disabled={currentPage === lastPage}>
        <IconSvg src={chevronRight} size={8} />
      </button>

      <div className={s['page-size-select']}>
        <span>Show</span>
        <SelectField
          options={['5', '10', '15', '20']}
          value={pageSize}
          onChange={onPageSizeSelect}
        />
        <span>items per page</span>
      </div>
    </div>
  );
};
