export type Pack = {
  _id: string;
  cardsCount: number;
  created: string;
  deckCover: string;
  grade: number;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
};

export type PackListData = {
  cardPacks: Array<Pack>;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type PackListQueryParams = {
  pageCount?: number;
  page?: number;
  packName?: string;
  user_id?: string;
  sortPacks?: string;
  min?: number;
  max?: number;
};
