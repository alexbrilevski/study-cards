import type { FC } from 'react';
import type { Card } from '../../../main/types/card';
import { useAppDispatch } from '../../../main/bll/store';
import { deleteCard, editCard, setCardListParams } from '../bll/cardListReducer';
import { formatDate } from '../../../utils/formatDate';
import Button from '../../../main/ui/common/components/Button/Button';
import ButtonSort from '../../../main/ui/common/components/ButtonSort/ButtonSort';
import Grade from '../../../main/ui/common/components/Grade/Grade';
import { IconSvg } from '../../../main/ui/common/components/IconSvg/IconSvg';
import editIcon from '../../../assets/icons/edit.svg';
import deleteIcon from '../../../assets/icons/trash.svg';

type CardListTableProps = {
  cards: Card[];
  sortCards: string;
  isAuthUserPack: boolean;
};

export const CardListTable: FC<CardListTableProps> = ({
  cards,
  sortCards,
  isAuthUserPack,
}) => {
  const dispatch = useAppDispatch();

  const setCardListSorting = (sortCards: string) => {
    dispatch(setCardListParams({ sortCards }));
  };

  const handleUpdateCard = (id: string) => {
    dispatch(editCard({ _id: id, question: 'Updated question' }));
  };

  const handleDeleteCard = (id: string) => {
    dispatch(deleteCard(id));
  };

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th>
            <ButtonSort
              sortParam={'question'}
              currentSorting={sortCards}
              onSortClick={setCardListSorting}
            >
              Question
            </ButtonSort>
          </th>
          <th>
            <ButtonSort
              sortParam={'answer'}
              currentSorting={sortCards}
              onSortClick={setCardListSorting}
            >
              Answer
            </ButtonSort>
          </th>
          <th>
            <ButtonSort
              sortParam={'updated'}
              currentSorting={sortCards}
              onSortClick={setCardListSorting}
            >
              Last Updated
            </ButtonSort>
          </th>
          <th>
            <ButtonSort
              sortParam={'grade'}
              currentSorting={sortCards}
              onSortClick={setCardListSorting}
            >
              Grade
            </ButtonSort>
          </th>
          {isAuthUserPack && <th></th>}
        </tr>
      </thead>
      <tbody className="table-body">
        {cards.map((card) => (
          <tr key={card._id}>
            <td width={'35%'}>{card.question}</td>
            <td width={'35%'}>{card.answer}</td>
            <td width={'15%'}>{formatDate(card.updated)}</td>
            <td>
              <Grade value={card.grade} />
            </td>
            {isAuthUserPack && (
              <td>
                <div className="table-actions">
                  <Button onClick={() => handleUpdateCard(card._id)}>
                    <IconSvg src={editIcon} size={16} />
                  </Button>
                  <Button onClick={() => handleDeleteCard(card._id)}>
                    <IconSvg src={deleteIcon} size={16} />
                  </Button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
