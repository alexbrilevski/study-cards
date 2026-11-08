import { useEffect, type FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import type { Card } from '../../../main/types/card';
import { addCard, fetchCardList } from '../bll/cardListReducer';
import ButtonBack from '../../../main/ui/common/components/ButtonBack/ButtonBack';
import type { User } from '../../../main/types/user';
import { PATH } from '../../../main/ui/Main/Pages';
import Button from '../../../main/ui/common/components/Button/Button';

export const CardList: FC = () => {
  const { packId } = useParams<'packId'>();
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const packName = useAppSelector<string>((state) => state.cardList.packName);
  const packUserId = useAppSelector<string>((state) => state.cardList.packUserId);
  const cards = useAppSelector<Card[]>((state) => state.cardList.cards);
  const isAuthUserPack = packUserId === authUser?._id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (packId) dispatch(fetchCardList(packId));
  }, [packId]);

  const handleGoBackClick = () => {
    navigate(-1);
  };

  const handleAddCard = () => {
    dispatch(
      addCard({
        cardsPack_id: packId as string,
        question: 'New question',
        answer: 'New answer',
      }),
    );
  };

  if (!authUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <ButtonBack onClick={handleGoBackClick} caption={'Back to Pack List'} />
      <div className="page-header">
        <h1>{packName}</h1>
        {isAuthUserPack && cards.length !== 0 && (
          <Button variant={'contained'} color={'primary'} onClick={handleAddCard}>
            Add new card
          </Button>
        )}
      </div>
      {cards.length === 0 ? (
        <div className="text-center">
          <p>This pack is empty.</p>
          {isAuthUserPack && (
            <>
              <p>Click add new card to fill this pack.</p>
              <Button variant={'contained'} color={'primary'} onClick={handleAddCard}>
                Add new card
              </Button>
            </>
          )}
        </div>
      ) : (
        <>
          {cards.map((card) => (
            <div key={card._id}>{card.question}</div>
          ))}
        </>
      )}
    </>
  );
};
