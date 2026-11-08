import type { FC } from 'react';
import type { Card } from '../../../main/types/card';
import { useAppDispatch } from '../../../main/bll/store';
import { deleteCard, updateCard } from '../bll/cardListReducer';
import Button from '../../../main/ui/common/components/Button/Button';
import { IconSvg } from '../../../main/ui/common/components/IconSvg/IconSvg';
import editIcon from '../../../assets/icons/edit.svg';
import deleteIcon from '../../../assets/icons/trash.svg';
import { formatDate } from '../../../utils/formatDate';

type CardListTableProps = {
  cards: Card[];
  isAuthUserPack: boolean;
};

export const CardListTable: FC<CardListTableProps> = ({ cards, isAuthUserPack }) => {
  const dispatch = useAppDispatch();

  const handleUpdateCard = (id: string) => {
    dispatch(updateCard({ _id: id, question: 'Updated question' }));
  };

  const handleDeleteCard = (id: string) => {
    dispatch(deleteCard(id));
  };

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Last Updated</th>
          <th>Grade</th>
          {isAuthUserPack && <th></th>}
        </tr>
      </thead>
      <tbody className="table-body">
        {cards.map((card) => (
          <tr key={card._id}>
            <td width={'35%'}>{card.question}</td>
            <td width={'35%'}>{card.answer}</td>
            <td width={'15%'}>{formatDate(card.updated)}</td>
            <td>{card.grade}</td>
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
