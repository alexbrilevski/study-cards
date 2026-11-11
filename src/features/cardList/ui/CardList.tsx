import { useEffect, type FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Card } from '../../../main/types/card';
import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { addCard, fetchCardList, setCardListParams } from '../bll/cardListReducer';
import { useDebouncedCallback } from '../../../utils/hooks/useDebouncedCallback';
import { PATH } from '../../../main/ui/Main/Pages';
import ButtonBack from '../../../main/ui/common/components/ButtonBack/ButtonBack';
import Button from '../../../main/ui/common/components/Button/Button';
import SearchField from '../../../main/ui/common/components/SearchField/SearchField';
import { CardPackMenu } from '../../../main/ui/common/components/CardPackMenu/CardPackMenu';
import { CardListTable } from './CardListTable';
import { Pagination } from '../../../main/ui/common/components/Pagination/Pagination';
import s from './CardList.module.css';

export const CardList: FC = () => {
  const { packId } = useParams<'packId'>();
  const authUser = useAppSelector<User | null>((state) => state.profile.user);
  const packName = useAppSelector<string>((state) => state.cardList.packName);
  const packUserId = useAppSelector<string>((state) => state.cardList.packUserId);
  const cards = useAppSelector<Card[]>((state) => state.cardList.cards);
  const cardQuestion = useAppSelector<string | undefined>(
    (state) => state.cardList.params.cardQuestion,
  );
  const sortCards = useAppSelector<string>((state) => state.cardList.params.sortCards);
  const page = useAppSelector<number>((state) => state.cardList.params.page);
  const pageSize = useAppSelector<number>((state) => state.cardList.params.pageCount);
  const cardsTotalCount = useAppSelector<number>(
    (state) => state.cardList.cardsTotalCount,
  );
  const isAuthUserPack = packUserId === authUser?._id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log('cards', cards);
  console.log('cardsTotalCount', cardsTotalCount);

  useEffect(() => {
    if (packId) dispatch(fetchCardList(packId));
  }, [packId, cardQuestion, sortCards, page, pageSize]);

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

  const setCardQuestionSearchParam = useDebouncedCallback((value: string) => {
    dispatch(setCardListParams({ cardQuestion: value }));
  }, 500);

  const setCardListPage = (page: number) => {
    dispatch(setCardListParams({ page }));
  };

  const setCardListPageSize = (pageSize: number) => {
    dispatch(setCardListParams({ pageCount: pageSize }));
  };

  if (!authUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <div className="page-header">
        <ButtonBack onClick={handleGoBackClick} caption={'Back to Pack List'} />
        <div className="page-header-main">
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
      </div>
      <div className={s['card-list-header']}>
        <SearchField
          label={'Search by Question'}
          name={'cardListSearch'}
          placeholder={'Provide your text'}
          value={cardQuestion !== undefined ? cardQuestion : ''}
          onChangeValue={setCardQuestionSearchParam}
        />
      </div>
      {cards.length !== 0 ? (
        <>
          <CardListTable
            cards={cards}
            sortCards={sortCards}
            isAuthUserPack={isAuthUserPack}
          />
          <Pagination
            currentPage={page}
            pageSize={pageSize}
            totalCount={cardsTotalCount}
            onPageChange={setCardListPage}
            onPageSizeChange={setCardListPageSize}
          />
        </>
      ) : (
        <div className="no-content-text caption text-center">
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
      )}
    </>
  );
};
