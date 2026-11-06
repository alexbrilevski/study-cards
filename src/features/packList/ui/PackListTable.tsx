import type { FC } from 'react';
import type { Pack } from '../../../main/types/pack';
import { useAppDispatch } from '../../../main/bll/store';
import { deletePack, editPack, setPackListParams } from '../bll/packListReducer';
import { formatDate } from '../../../utils/formatDate';
import Button from '../../../main/ui/common/components/Button/Button';
import ButtonSort from '../../../main/ui/common/components/ButtonSort/ButtonSort';
import { IconSvg } from '../../../main/ui/common/components/IconSvg/IconSvg';
import learnIcon from '../../../assets/icons/teacher.svg';
import editIcon from '../../../assets/icons/edit.svg';
import deleteIcon from '../../../assets/icons/trash.svg';

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
    <table className="table">
      <thead className="table-head">
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
      <tbody className="table-body">
        {packs.map((pack) => {
          return (
            <tr key={pack._id}>
              <td width={'30%'}>{pack.name}</td>
              <td width={'15%'}>{pack.cardsCount}</td>
              <td width={'20%'}>{formatDate(pack.updated)}</td>
              <td width={'20%'}>{pack.user_name}</td>
              <td width={'15%'}>
                <div className="table-actions">
                  <Button>
                    <IconSvg src={learnIcon} size={16} />
                  </Button>
                  {pack.user_id === authUserId && (
                    <>
                      <Button onClick={() => handleEditPack(pack._id)}>
                        <IconSvg src={editIcon} size={16} />
                      </Button>
                      <Button onClick={() => handleDeletePack(pack._id)}>
                        <IconSvg src={deleteIcon} size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
