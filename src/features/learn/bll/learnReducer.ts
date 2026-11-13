import type { Card, CardListData } from '../../../main/types/card';
import type { RootThunk } from '../../../main/bll/store';
import { setAppIsLoading } from '../../../main/bll/appReducer';
import { cardListAPI } from '../../cardList/dal/cardListApi';
import { handleApiRequestError } from '../../../utils/notificationUtils';
import { learnAPI, type UpdateCardGradeData } from '../dal/learnApi';
import type { Grade } from '../../../main/types/grade';

// Constants
const ACTION_TYPES = {
  SET_CARD_PACK_TO_LEARN: 'learn/SET-CARD-PACK-TO-LEARN',
  SET_UPDATED_CARD_GRADE: 'learn/SET-UPDATED-CARD-GRADE',
} as const;

export type LearnActions =
  | ReturnType<typeof setCardPackToLearn>
  | ReturnType<typeof setUpdatedCardGrade>;

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
    case ACTION_TYPES.SET_UPDATED_CARD_GRADE: {
      const { card_id, grade, shots } = action.payload.grade;
      return {
        ...state,
        cardPack: {
          ...state.cardPack,
          cards: state.cardPack.cards.map((card) =>
            card._id === card_id ? { ...card, grade, shots } : card,
          ),
        },
      };
    }
    default: {
      return state;
    }
  }
};

// Action creators
const setCardPackToLearn = (cardPack: Pick<CardListData, 'packName' | 'cards'>) =>
  ({ type: ACTION_TYPES.SET_CARD_PACK_TO_LEARN, payload: { cardPack } }) as const;
const setUpdatedCardGrade = (grade: Grade) =>
  ({ type: ACTION_TYPES.SET_UPDATED_CARD_GRADE, payload: { grade } }) as const;

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
export const updateCardGrade =
  (data: UpdateCardGradeData): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    learnAPI
      .updateCardGrade(data)
      .then((data) => {
        const { updatedGrade } = data;
        if (updatedGrade) {
          dispatch(setUpdatedCardGrade(updatedGrade));
        }
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
