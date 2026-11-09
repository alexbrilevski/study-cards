import { useEffect, type FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Card } from '../../../main/types/card';
import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { addCard, fetchCardList } from '../bll/cardListReducer';
import { PATH } from '../../../main/ui/Main/Pages';
import ButtonBack from '../../../main/ui/common/components/ButtonBack/ButtonBack';
import Button from '../../../main/ui/common/components/Button/Button';
import { CardPackMenu } from '../../../main/ui/common/components/CardPackMenu/CardPackMenu';
import { CardListTable } from './CardListTable';

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
        <div className="page-title-container">
          <h1>{packName}</h1>
          {isAuthUserPack && (
            <CardPackMenu
              cardPackId={packId as string}
              isEmptyPack={cards.length === 0}
            />
          )}
        </div>
        {cards.length !== 0 &&
          (isAuthUserPack ? (
            <Button variant={'contained'} color={'primary'} onClick={handleAddCard}>
              Add new card
            </Button>
          ) : (
            <Button variant={'contained'} color={'primary'} onClick={handleAddCard}>
              Learn pack
            </Button>
          ))}
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
        <CardListTable cards={cards} isAuthUserPack={isAuthUserPack} />
      )}
    </>
  );
};
