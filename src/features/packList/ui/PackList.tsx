import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { useDebouncedCallback } from '../../../utils/hooks/useDebouncedCallback';
import type { User } from '../../../main/types/user';
import type { Pack } from '../../../main/types/pack';
import { addPack, fetchPackList, setPackListParams } from '../bll/packListReducer';
import { PATH } from '../../../main/ui/Main/Pages';
import Button from '../../../main/ui/common/components/Button/Button';
import { PackListHeader } from './PackListHeader/PackListHeader';
import { PackListTable } from './PackListTable';
import { Pagination } from '../../../main/ui/common/components/Pagination/Pagination';

export type CardsPackListView = 'my' | 'all';

export const PackList = () => {
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const cardPacks = useAppSelector<Pack[]>((state) => state.packList.cardPacks);
  const minCardsCount = useAppSelector<number>((state) => state.packList.minCardsCount);
  const maxCardsCount = useAppSelector<number>((state) => state.packList.maxCardsCount);
  const min = useAppSelector<number | undefined>((state) => state.packList.min);
  const max = useAppSelector<number | undefined>((state) => state.packList.max);
  const packName = useAppSelector<string | undefined>((state) => state.packList.packName);
  const user_id = useAppSelector<string | undefined>((state) => state.packList.user_id);
  const sortPacks = useAppSelector<string>((state) => state.packList.sortPacks);
  const page = useAppSelector<number>((state) => state.packList.page);
  const pageSize = useAppSelector<number>((state) => state.packList.pageCount);
  const totalPacksCount = useAppSelector<number>(
    (state) => state.packList.cardPacksTotalCount,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPackList());
  }, [page, pageSize, packName, user_id, min, max, sortPacks]);

  const handleAddPack = () => {
    dispatch(addPack({ name: 'New pack', isPrivate: false }));
  };

  const setPackNameSearchParam = useDebouncedCallback((packName: string) => {
    dispatch(setPackListParams({ packName }));
  }, 500);

  const setPackListView = (view: CardsPackListView) => {
    dispatch(setPackListParams({ user_id: view === 'my' ? authUser?._id : undefined }));
  };

  const setCardsCountRange = useDebouncedCallback(([min, max]: [number, number]) => {
    dispatch(setPackListParams({ min, max }));
  }, 500);

  const resetPackListFilters = () => {
    dispatch(
      setPackListParams({
        packName: undefined,
        min: undefined,
        max: undefined,
        user_id: undefined,
      }),
    );
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
      <div className="page-header">
        <h1>Pack list</h1>
        <Button variant={'contained'} color={'primary'} onClick={handleAddPack}>
          Add new pack
        </Button>
      </div>
      {cardPacks.length === 0 ? (
        <div>
          <p className="text-center">
            No card packs found. Click Add new pack to create new pack or change list
            filters.
          </p>
        </div>
      ) : (
        <div>
          <PackListHeader
            packName={packName !== undefined ? packName : ''}
            min={min !== undefined ? min : minCardsCount}
            max={max !== undefined ? max : maxCardsCount}
            minCardsCount={minCardsCount}
            maxCardsCount={maxCardsCount}
            userId={user_id !== undefined ? user_id : ''}
            onSearchByPackName={setPackNameSearchParam}
            onSelectPackListView={setPackListView}
            onCardsCountRangeChange={setCardsCountRange}
            onClearFilters={resetPackListFilters}
          />
          <PackListTable
            packs={cardPacks}
            authUserId={authUser._id}
            sortPacks={sortPacks}
          />
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
