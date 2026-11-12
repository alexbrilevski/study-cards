import { useEffect, useState, type FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Card } from '../../../main/types/card';
import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { fetchCardPackToLearn } from '../bll/learnReducer';
import { getRandomCard } from '../../../utils/getRandomCard';
import { PATH } from '../../../main/ui/Main/Pages';
import ButtonBack from '../../../main/ui/common/components/ButtonBack/ButtonBack';
import { LearnCard } from './LearnCard';

type LearnPageProps = {};

export const LearnPage: FC<LearnPageProps> = () => {
  const [randomCard, setRandomCard] = useState<Card | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const { cardPackId } = useParams<'cardPackId'>();
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const packName = useAppSelector<string>((state) => state.learn.cardPack.packName);
  const cards = useAppSelector<Card[]>((state) => state.learn.cardPack.cards);
  const isFetchingCardPack = useAppSelector<boolean>((state) => state.app.isLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cardPackId && isFirstLoad) {
      dispatch(fetchCardPackToLearn(cardPackId));
      setIsFirstLoad(false);
    }

    if (cards.length > 0) setRandomCard(getRandomCard(cards));

    return () => {
      setRandomCard(null);
    };
  }, [cardPackId, isFirstLoad, cards]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!authUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <ButtonBack caption={'Back'} onClick={handleGoBack} />
      <h1>Learn {packName}</h1>
      {isFetchingCardPack ? (
        <p>
          Just a moment, please.
          <br />
          Fetching a random card...
        </p>
      ) : (
        <LearnCard card={randomCard} />
      )}
    </div>
  );
};
