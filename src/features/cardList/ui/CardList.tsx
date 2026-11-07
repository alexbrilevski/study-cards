import { useEffect, type FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import type { Card } from '../../../main/types/card';
import { fetchCardList } from '../bll/cardListReducer';
import ButtonBack from '../../../main/ui/common/components/ButtonBack/ButtonBack';
import type { User } from '../../../main/types/user';
import { PATH } from '../../../main/ui/Main/Pages';

export const CardList: FC = () => {
  const { packId } = useParams<'packId'>();
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const cards = useAppSelector<Card[]>((state) => state.cardList.cards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (packId) dispatch(fetchCardList(packId));
  }, []);

  const handleGoBackClick = () => {
    navigate(-1);
  };

  if (!authUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <ButtonBack onClick={handleGoBackClick} caption={'Back to pack list'} />
      <h1>Card pack</h1>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>{card.question}</li>
        ))}
      </ul>
    </div>
  );
};
