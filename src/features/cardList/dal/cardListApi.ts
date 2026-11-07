import { baseInstance } from '../../../main/dal/instance';
import type { CardListData, CardListQueryParams } from '../../../main/types/card';

export const cardListAPI = {
  getCards(params: CardListQueryParams) {
    return baseInstance.get<CardListData>('cards/card', { params }).then((response) => {
      return response.data;
    });
  },
};
