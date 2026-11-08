import { setAppIsLoading } from '../../../main/bll/appReducer';
import type { RootThunk } from '../../../main/bll/store';
import type { Card, CardListData } from '../../../main/types/card';
import { handleApiRequestError } from '../../../utils/notificationUtils';
import { cardListAPI, type NewCardData, type UpdateCardData } from '../dal/cardListApi';

// Constants
const ACTION_TYPES = {
  SET_CARD_LIST_DATA: 'card-list/SET-DATA',
} as const;

export type CardListActions = ReturnType<typeof setCardListData>;
type InitState = typeof initState;

const initState = {
  cards: [] as Card[],
  packUserId: '',
  packName: '',
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  params: {
    cardsPack_id: '',
    cardAnswer: undefined as string | undefined,
    cardQuestion: undefined as string | undefined,
    min: undefined as number | undefined,
    max: undefined as number | undefined,
    sortCards: '',
    page: 1,
    pageCount: 10,
  },
};

export const cardListReducer = (
  state: InitState = initState,
  action: CardListActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_CARD_LIST_DATA: {
      const { page, pageCount, ...cardListData } = action.payload;
      return {
        ...state,
        ...cardListData,
        params: { ...state.params, page, pageCount },
      };
    }
    default: {
      return state;
    }
  }
};

// Action creators
const setCardListData = (cardListData: CardListData) =>
  ({ type: ACTION_TYPES.SET_CARD_LIST_DATA, payload: cardListData }) as const;

// Thunk creators
export const fetchCardList =
  (cardsPack_id: string): RootThunk =>
  (dispatch, getState) => {
    const params = { ...getState().cardList.params, cardsPack_id };

    dispatch(setAppIsLoading(true));
    cardListAPI
      .getCards(params)
      .then((data) => {
        dispatch(setCardListData(data));
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        setAppIsLoading(false);
      });
  };
export const addCard =
  (cardData: NewCardData): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    cardListAPI
      .addCard(cardData)
      .then((data) => {
        const { newCard } = data;
        if (newCard) {
          dispatch(fetchCardList(newCard.cardsPack_id));
        }
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        setAppIsLoading(false);
      });
  };
export const updateCard =
  (cardData: UpdateCardData): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    cardListAPI
      .updateCard(cardData)
      .then((data) => {
        const { updatedCard } = data;
        if (updatedCard) {
          dispatch(fetchCardList(updatedCard.cardsPack_id));
        }
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        setAppIsLoading(false);
      });
  };
export const deleteCard =
  (id: string): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    cardListAPI
      .deleteCard(id)
      .then((data) => {
        const { deletedCard } = data;
        dispatch(fetchCardList(deletedCard.cardsPack_id));
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        setAppIsLoading(false);
      });
  };
