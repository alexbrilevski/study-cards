import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import type { User } from '../../../main/types/user';
import { fetchPackList } from '../bll/packListReducer';
import { Navigate } from 'react-router-dom';
import { PATH } from '../../../main/ui/Main/Pages';

export const PackList = () => {
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const cardPacks = useAppSelector(state => state.packList.cardPacks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPackList());
  }, []);

  if (!authUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      Pack list
      <div>
        {cardPacks.map(cardPack => <div key={cardPack._id}>{cardPack.name}</div>)}
      </div>
    </div>
  );
};
