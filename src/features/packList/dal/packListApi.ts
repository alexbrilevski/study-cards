import type { PackListQueryParams, PackListData, Pack } from '../../../main/types/pack';
import { baseInstance } from '../../../main/dal/instance';

type GetPacksRequestParams = PackListQueryParams;

type GetPacksResponseData = PackListData;

export type AddPackRequestData = { name: string; deckCover?: string; isPrivate: boolean };

export type UpdatePackRequestData = { _id: string } & Partial<Omit<Pack, '_id'>>;

export const packListAPI = {
  getPacks(params: GetPacksRequestParams) {
    return baseInstance
      .get<GetPacksResponseData>('cards/pack', { params })
      .then((response) => response.data);
  },
  addPack(cardsPack: AddPackRequestData) {
    return baseInstance
      .post<{ newCardsPack: Pack }>('cards/pack', {
        cardsPack,
      })
      .then((response) => response.data);
  },
  updatePack(cardsPack: UpdatePackRequestData) {
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
