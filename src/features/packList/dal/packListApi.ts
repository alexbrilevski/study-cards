import type { PackListQueryParams, PackListData } from '../../../main/types/pack';
import { baseInstance } from '../../../main/dal/instance';

type RequestParams = PackListQueryParams;

type ResponseData = PackListData;

export const packListAPI = {
  getPacks(params: RequestParams) {
    return baseInstance
      .get<ResponseData>('cards/pack', { params })
      .then((response) => response.data);
  },
};
