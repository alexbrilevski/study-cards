import { setAppIsLoading } from '../../../main/bll/appReducer';
import type { RootThunk } from '../../../main/bll/store';
import type { Pack, PackListData } from '../../../main/types/pack';
import { handleApiRequestError } from '../../../utils/notificationUtils';
import { packListAPI } from '../dal/packListApi';

const ACTION_TYPES = {
  SET_PACK_LIST_DATA: 'pack-list/SET-PACK-LIST-DATA',
};

export type PackListActions = ReturnType<typeof setPackListData>;

type InitState = typeof initState;

const initState = {
  cardPacks: [] as Pack[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 10,
};

export const packListReducer = (
  state: InitState = initState,
  action: PackListActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_PACK_LIST_DATA: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

const setPackListData = (packListData: PackListData) =>
  ({ type: ACTION_TYPES.SET_PACK_LIST_DATA, payload: { ...packListData } }) as const;

export const fetchPackList = (): RootThunk => (dispatch, getState) => {
  const {pageCount, page } = getState().packList;
  
  dispatch(setAppIsLoading(true));
  packListAPI
    .getPacks({pageCount, page})
    .then((data) => {
      console.log('response data:', data);
      dispatch(setPackListData(data));
    })
    .catch((error) => {
      handleApiRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoading(false));
    });
};
