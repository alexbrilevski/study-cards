import { baseInstance } from '../../../main/dal/instance';
import type { Card, CardListData, CardListQueryParams } from '../../../main/types/card';

export type NewCardData = {
  cardsPack_id: string;
  question: string;
  answer: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export const cardListAPI = {
  getCards(params: CardListQueryParams) {
    return baseInstance.get<CardListData>('cards/card', { params }).then((response) => {
      return response.data;
    });
  },
  addCard(cardData: NewCardData) {
    return baseInstance
      .post<{ newCard: Card }>('cards/card', { card: cardData })
      .then((response) => {
        return response.data;
      });
  },
};
