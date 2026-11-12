import type { Card, CardListData } from '../../../main/types/card';
import type { RootThunk } from '../../../main/bll/store';
import { setAppIsLoading } from '../../../main/bll/appReducer';
import { cardListAPI } from '../../cardList/dal/cardListApi';
import { handleApiRequestError } from '../../../utils/notificationUtils';

// Constants
const ACTION_TYPES = {
  SET_CARD_PACK_TO_LEARN: 'learn/SET-CARD-PACK-TO-LEARN',
} as const;

export type LearnActions = ReturnType<typeof setCardPackToLearn>;

type InitState = typeof initState;

const initState = {
  cardPack: {
    packName: '',
    cards: [] as Card[],
  },
};

export const learnReducer = (
  state: InitState = initState,
  action: LearnActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_CARD_PACK_TO_LEARN: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

// Action creators
const setCardPackToLearn = (cardPack: Pick<CardListData, 'packName' | 'cards'>) =>
  ({ type: ACTION_TYPES.SET_CARD_PACK_TO_LEARN, payload: { cardPack } }) as const;

// Thunk creators
export const fetchCardPackToLearn =
  (cardPackId: string): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    cardListAPI
      .getCards({ cardsPack_id: cardPackId, pageCount: 1000000 })
      .then((data) => {
        dispatch(setCardPackToLearn({ packName: data.packName, cards: data.cards }));
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
