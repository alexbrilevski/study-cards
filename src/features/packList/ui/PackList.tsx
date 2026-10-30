import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import type { User } from '../../../main/types/user';
import type { Pack } from '../../../main/types/pack';
import { addPack, deletePack, editPack, fetchPackList } from '../bll/packListReducer';
import { Navigate } from 'react-router-dom';
import { PATH } from '../../../main/ui/Main/Pages';
import Button from '../../../main/ui/common/components/Button/Button';

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

  const handleEditPack = (id: string) => {
    dispatch(editPack({ _id: id, name: 'Edited pack', isPrivate: false }));
  };

  const handleDeletePack = (id: string) => {
    dispatch(deletePack(id));
  };

  if (!authUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <div>
        <h1>Pack list</h1>
        {cardPacks.length !== 0 && <Button variant={'contained'} color={'primary'} onClick={handleAddPack}>
          Add new pack
        </Button>}
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
          {cardPacks.map((cardPack) => (
            <div key={cardPack._id}>
              <div>{cardPack.name}</div>
              <div>
                <Button>Learn</Button>
                {cardPack.user_id === authUser._id && (
                  <>
                    <Button onClick={() => handleEditPack(cardPack._id)}>Edit</Button>
                    <Button onClick={() => handleDeletePack(cardPack._id)}>Delete</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
