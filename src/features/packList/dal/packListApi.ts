import type { PackListQueryParams, PackListData, Pack } from '../../../main/types/pack';
import { baseInstance } from '../../../main/dal/instance';

type RequestParams = PackListQueryParams;

type ResponseData = PackListData;

export const packListAPI = {
  getPacks(params: RequestParams) {
    return baseInstance
      .get<ResponseData>('cards/pack', { params })
      .then((response) => response.data);
  },
  addPack(cardsPack: { name: string; isPrivate: boolean }) {
    return baseInstance
      .post<{ newCardsPack: Pack }>('cards/pack', {
        cardsPack,
      })
      .then((response) => response.data);
  },
  updatePack(cardsPack: { _id: string; name: string; isPrivate: boolean }) {
    return baseInstance
      .put<{ updatedCardsPack: Pack }>('cards/pack', {
        cardsPack,
      })
      .then((response) => response.data);
  },
  deletePack(id: string) {
    return baseInstance
      .delete<{ deletedCardsPack: Pack }>(`cards/pack?id=${id}`)
      .then((response) => response.data);
  },
};
