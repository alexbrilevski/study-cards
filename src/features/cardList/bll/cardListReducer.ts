import { setAppIsLoading } from '../../../main/bll/appReducer';
import type { RootThunk } from '../../../main/bll/store';
import type { Card, CardListData, CardListQueryParams } from '../../../main/types/card';
import { handleApiRequestError } from '../../../utils/notificationUtils';
import { cardListAPI, type NewCardData, type UpdateCardData } from '../dal/cardListApi';

// Constants
const ACTION_TYPES = {
  SET_CARD_LIST_DATA: 'card-list/SET-DATA',
  SET_CARD_LIST_PARAMS: 'card-list/SET-CARD-LIST-PARAMS',
  UPDATE_CARD_PACK_NAME: 'card-list/UPDATE-CARD-PACK-NAME',
} as const;

export type CardListActions =
  | ReturnType<typeof setCardListData>
  | ReturnType<typeof setCardListParams>
  | ReturnType<typeof updateCardPackName>;

type InitState = typeof initState;

const initState = {
  cards: [] as Card[],
  packUserId: '',
  packName: '',
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  params: {
    cardAnswer: undefined as string | undefined,
    cardQuestion: undefined as string | undefined,
    min: undefined as number | undefined,
    max: undefined as number | undefined,
    sortCards: '0updated',
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
    case ACTION_TYPES.SET_CARD_LIST_PARAMS: {
      return { ...state, params: { ...state.params, ...action.payload } };
    }
    case ACTION_TYPES.UPDATE_CARD_PACK_NAME: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

// Action creators
const setCardListData = (cardListData: CardListData) =>
  ({ type: ACTION_TYPES.SET_CARD_LIST_DATA, payload: cardListData }) as const;
export const setCardListParams = (params: Omit<CardListQueryParams, 'cardsPack_id'>) =>
  ({ type: ACTION_TYPES.SET_CARD_LIST_PARAMS, payload: params }) as const;
export const updateCardPackName = (packName: string) =>
  ({ type: ACTION_TYPES.UPDATE_CARD_PACK_NAME, payload: { packName } }) as const;

// Thunk creators
export const fetchCardList =
  (cardsPack_id: string): RootThunk =>
  (dispatch, getState) => {
    const params = { cardsPack_id, ...getState().cardList.params };

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
export const editCard =
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
