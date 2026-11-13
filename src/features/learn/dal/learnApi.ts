import { baseInstance } from '../../../main/dal/instance';
import type { Grade } from '../../../main/types/grade';

export type UpdateCardGradeData = {
  card_id: string;
  grade: number;
};

type UpdateGradeResponseData = {
  updatedGrade: Grade;
};

export const learnAPI = {
  updateCardGrade(data: UpdateCardGradeData) {
    return baseInstance
      .put<UpdateGradeResponseData>('cards/grade', data)
      .then((response) => response.data);
  },
};
