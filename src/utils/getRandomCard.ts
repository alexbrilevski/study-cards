import type { Card } from '../main/types/card';

export const getRandomCard = (cards: Array<Card>): Card => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);
  const randomNumber = Math.random() * sum;
  let s = 0;
  let i = 0;

  while (s < randomNumber) {
    s += (6 - cards[i].grade) ** 2;
    i++;
  }

  return cards[i - 1];
};
