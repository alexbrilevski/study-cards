import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import type { User } from '../../../main/types/user';
import type { Pack } from '../../../main/types/pack';
import { addPack, fetchPackList, setPackListParams } from '../bll/packListReducer';
import { Navigate } from 'react-router-dom';
import { PATH } from '../../../main/ui/Main/Pages';
import Button from '../../../main/ui/common/components/Button/Button';
import { PackListHeader } from './PackListHeader';
import { PackListTable } from './PackListTable';
import { Pagination } from '../../../main/ui/common/components/Pagination/Pagination';

export const PackList = () => {
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const cardPacks = useAppSelector<Pack[]>((state) => state.packList.cardPacks);
  const minCardsCount = useAppSelector((state) => state.packList.minCardsCount);
  const maxCardsCount = useAppSelector((state) => state.packList.maxCardsCount);
  const min = useAppSelector((state) => state.packList.min);
  const max = useAppSelector((state) => state.packList.max);
  const page = useAppSelector<number>((state) => state.packList.page);
  const pageSize = useAppSelector<number>((state) => state.packList.pageCount);
  const totalPacksCount = useAppSelector<number>(
    (state) => state.packList.cardPacksTotalCount,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPackList());
  }, [page, pageSize, min, max]);

  const handleAddPack = () => {
    dispatch(addPack({ name: 'New pack', isPrivate: false }));
  };

  const setCardsCountRange = ([min, max]: [number, number]) => {
    dispatch(setPackListParams({ min, max }));
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPackListParams({ page: pageNumber }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatch(setPackListParams({ pageCount: pageSize }));
  };

  if (!authUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <div>
        <h1>Pack list</h1>
        {cardPacks.length !== 0 && (
          <Button variant={'contained'} color={'primary'} onClick={handleAddPack}>
            Add new pack
          </Button>
        )}
      </div>
      {cardPacks.length === 0 ? (
        <div>
          <p>There are no card packs yet. Click Add new pack to create new pack.</p>
          <Button variant={'contained'} color={'primary'} onClick={handleAddPack}>
            Add new pack
          </Button>
        </div>
      ) : (
        <div>
          <PackListHeader
            minCardsCount={minCardsCount}
            maxCardsCount={maxCardsCount}
            onCardsCountRangeChange={setCardsCountRange}
          />
          <PackListTable packs={cardPacks} authUserId={authUser._id} />
          <Pagination
            currentPage={page}
            pageSize={pageSize}
            totalCount={totalPacksCount}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </div>
  );
};
