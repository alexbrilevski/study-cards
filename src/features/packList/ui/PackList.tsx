import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import type { User } from '../../../main/types/user';
import type { Pack } from '../../../main/types/pack';
import { addPack, fetchPackList } from '../bll/packListReducer';
import { Navigate } from 'react-router-dom';
import { PATH } from '../../../main/ui/Main/Pages';
import Button from '../../../main/ui/common/components/Button/Button';
import { PackListTable } from './PackListTable';

export const PackList = () => {
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const cardPacks = useAppSelector<Pack[]>((state) => state.packList.cardPacks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPackList());
  }, []);

  const handleAddPack = () => {
    dispatch(addPack({ name: 'New pack', isPrivate: false }));
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
        <PackListTable packs={cardPacks} authUserId={authUser._id} />
      )}
    </div>
  );
};
