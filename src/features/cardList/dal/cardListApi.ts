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

export type UpdateCardData = { _id: string } & Partial<Omit<Card, '_id'>>;

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
  updateCard(cardData: UpdateCardData) {
    return baseInstance
      .put<{ updatedCard: Card }>('cards/card', { card: cardData })
      .then((response) => {
        return response.data;
      });
  },
  deleteCard(id: string) {
    return baseInstance
      .delete<{ deletedCard: Card }>('cards/card', { params: { id } })
      .then((response) => {
        return response.data;
      });
  },
};
