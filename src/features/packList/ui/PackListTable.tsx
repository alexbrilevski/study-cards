import type { FC } from 'react';
import type { Pack } from '../../../main/types/pack';
import { useAppDispatch } from '../../../main/bll/store';
import { deletePack, editPack, setPackListParams } from '../bll/packListReducer';
import Button from '../../../main/ui/common/components/Button/Button';
import ButtonSort from '../../../main/ui/common/components/ButtonSort/ButtonSort';

type PackListTableProps = {
  packs: Pack[];
  authUserId: string;
  sortPacks: string;
};

export const PackListTable: FC<PackListTableProps> = ({
  packs,
  authUserId,
  sortPacks,
}) => {
  const dispatch = useAppDispatch();

  const setPackListSorting = (sortPacks: string) => {
    dispatch(setPackListParams({ sortPacks }));
  };

  const handleEditPack = (id: string) => {
    dispatch(editPack({ _id: id, name: 'Edited pack', isPrivate: false }));
  };

  const handleDeletePack = (id: string) => {
    dispatch(deletePack(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <ButtonSort
              sortParam={'name'}
              currentSorting={sortPacks}
              onSortClick={setPackListSorting}
            >
              Name
            </ButtonSort>
          </th>
          <th>
            <ButtonSort
              sortParam={'cardsCount'}
              currentSorting={sortPacks}
              onSortClick={setPackListSorting}
            >
              Cards
            </ButtonSort>
          </th>
          <th>
            <ButtonSort
              sortParam={'updated'}
              currentSorting={sortPacks}
              onSortClick={setPackListSorting}
            >
              Last Updated
            </ButtonSort>
          </th>
          <th>Created by</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {packs.map((pack) => {
          return (
            <tr key={pack._id}>
              <td>{pack.name}</td>
              <td>{pack.cardsCount}</td>
              <td>{pack.updated}</td>
              <td>{pack.user_name}</td>
              <td>
                <Button>Learn</Button>
                {pack.user_id === authUserId && (
                  <>
                    <Button onClick={() => handleEditPack(pack._id)}>Edit</Button>
                    <Button onClick={() => handleDeletePack(pack._id)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
