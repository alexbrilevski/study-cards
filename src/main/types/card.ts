export type Card = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  question: string;
  answer: string;
  grade: number;
  shots: number;
  comments?: string;
  type?: string;
  rating?: number;
  created: string;
  updated: string;
};

export type CardListData = {
  cards: Array<Card>;
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packCreated: string;
  packUpdated: string;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
};

export type CardListQueryParams = {
  cardsPack_id: string;
  cardAnswer?: string;
  cardQuestion?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
