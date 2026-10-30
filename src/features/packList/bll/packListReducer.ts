import { setAppIsLoading } from '../../../main/bll/appReducer';
import type { RootThunk } from '../../../main/bll/store';
import type { Pack, PackListData } from '../../../main/types/pack';
import { handleApiRequestError } from '../../../utils/notificationUtils';
import { packListAPI } from '../dal/packListApi';

// Constants
const ACTION_TYPES = {
  SET_PACK_LIST_DATA: 'pack-list/SET-PACK-LIST-DATA',
};

// Types
type InitState = typeof initState;
export type PackListActions = ReturnType<typeof setPackListData>;

// Initial state
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

// Action creators
const setPackListData = (packListData: PackListData) =>
  ({ type: ACTION_TYPES.SET_PACK_LIST_DATA, payload: { ...packListData } }) as const;

// Thunk creators
export const fetchPackList = (): RootThunk => (dispatch, getState) => {
  const { pageCount, page } = getState().packList;

  dispatch(setAppIsLoading(true));
  packListAPI
    .getPacks({ pageCount, page })
    .then((data) => {
      dispatch(setPackListData(data));
    })
    .catch((error) => {
      handleApiRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoading(false));
    });
};
export const addPack =
  (cardsPack: { name: string; isPrivate: boolean }): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    packListAPI
      .addPack(cardsPack)
      .then((data) => {
        if (data.newCardsPack) dispatch(fetchPackList());
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
export const editPack =
  (cardsPack: { _id: string; name: string; isPrivate: boolean }): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    packListAPI
      .updatePack(cardsPack)
      .then((data) => {
        if (data.updatedCardsPack) dispatch(fetchPackList());
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
export const deletePack =
  (id: string): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    packListAPI
      .deletePack(id)
      .then((data) => {
        if (data.deletedCardsPack) dispatch(fetchPackList());
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
