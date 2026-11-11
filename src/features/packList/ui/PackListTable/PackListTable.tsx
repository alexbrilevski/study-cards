import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import type { Pack } from '../../../../main/types/pack';
import { useAppDispatch } from '../../../../main/bll/store';
import { deletePack, editPack, setPackListParams } from '../../bll/packListReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import { formatDate } from '../../../../utils/formatDate';
import Button from '../../../../main/ui/common/components/Button/Button';
import ButtonSort from '../../../../main/ui/common/components/ButtonSort/ButtonSort';
import { IconSvg } from '../../../../main/ui/common/components/IconSvg/IconSvg';
import learnIcon from '../../../../assets/icons/teacher.svg';
import editIcon from '../../../../assets/icons/edit.svg';
import deleteIcon from '../../../../assets/icons/trash.svg';
import s from './PackListTable.module.css';

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
    dispatch(editPack({ _id: id, name: 'Edited pack', private: false }));
  };

  const handleDeletePack = (id: string) => {
    dispatch(deletePack(id));
  };

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th className={s['name-col']}>
            <ButtonSort
              sortParam={'name'}
              currentSorting={sortPacks}
              onSortClick={setPackListSorting}
            >
              Name
            </ButtonSort>
          </th>
          <th className={s['cards-count-col']}>
            <ButtonSort
              sortParam={'cardsCount'}
              currentSorting={sortPacks}
              onSortClick={setPackListSorting}
            >
              Cards
            </ButtonSort>
          </th>
          <th className={s['updated-col']}>
            <ButtonSort
              sortParam={'updated'}
              currentSorting={sortPacks}
              onSortClick={setPackListSorting}
            >
              Last Updated
            </ButtonSort>
          </th>
          <th className={s['author-col']}>Created by</th>
          <th className={s['actions-col']}>Actions</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {packs.map((pack) => {
          return (
            <tr key={pack._id}>
              <td>
                <NavLink to={`${PATH.CARD_LIST}/${pack._id}`}>{pack.name}</NavLink>
              </td>
              <td>{pack.cardsCount}</td>
              <td>{formatDate(pack.updated)}</td>
              <td>{pack.user_name}</td>
              <td>
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
