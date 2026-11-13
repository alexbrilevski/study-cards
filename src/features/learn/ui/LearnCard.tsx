import { useState, type FC } from 'react';
import type { Card } from '../../../main/types/card';
import Button from '../../../main/ui/common/components/Button/Button';
import InputRadio from '../../../main/ui/common/components/InputRadio/InputRadio';
import { useAppDispatch } from '../../../main/bll/store';
import { updateCardGrade } from '../bll/learnReducer';

type LearnCardProps = {
  card: Card | null;
};

const grades = [
  'Did not know',
  'Forgot',
  'A lot of thought',
  'Confused',
  'Knew the answer',
];

export const LearnCard: FC<LearnCardProps> = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [grade, setGrade] = useState<string>(grades[0]);
  const dispatch = useAppDispatch();

  if (!card) {
    return <div>No cards found in this pack.</div>;
  }

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCardSwitch = () => {
    setShowAnswer(false);
    dispatch(updateCardGrade({ card_id: card._id, grade: grades.indexOf(grade) + 1 }));
  };

  return (
    <div>
      <p>Question: {card.question}</p>
      <p>Number of times the question was answered: {card.shots}</p>
      <div>
        {!showAnswer ? (
          <Button variant={'contained'} color={'primary'} onClick={handleShowAnswer}>
            Show answer
          </Button>
        ) : (
          <>
            <p>{card.answer}</p>
            <div>
              <p>Rate yourself:</p>
              <InputRadio
                name={'grade'}
                options={grades}
                value={grade}
                onChangeOption={setGrade}
              />
            </div>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={handleNextCardSwitch}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
