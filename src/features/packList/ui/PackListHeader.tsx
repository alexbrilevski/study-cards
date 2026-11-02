import type { FC } from 'react';
import type { CardsPackListView } from './PackList';
import DoubleRangeField from '../../../main/ui/common/components/DoubleRangeField/DoubleRangeField';
import SearchField from '../../../main/ui/common/components/SearchField/SearchField';

type PackListHeaderProps = {
  packName: string;
  min: number;
  max: number;
  minCardsCount: number;
  maxCardsCount: number;
  userId: string;
  onSearchByPackName: (packName: string) => void;
  onCardsCountRangeChange: (value: [number, number]) => void;
  onSelectPackListView: (view: CardsPackListView) => void;
};

export const PackListHeader: FC<PackListHeaderProps> = ({
  packName,
  min,
  max,
  minCardsCount,
  maxCardsCount,
  userId,
  onSearchByPackName,
  onCardsCountRangeChange,
  onSelectPackListView,
}) => {
  return (
    <div>
      <SearchField
        label={'Search by name'}
        placeholder={'Provide your text'}
        name={'packName'}
        value={packName}
        onChangeValue={onSearchByPackName}
      />
      <div>
        <h2>Show cards packs</h2>
        <div>
          <button
            className={userId ? 'active' : undefined}
            onClick={() => onSelectPackListView('my')}
          >
            My
          </button>
          <button
            className={!userId ? 'active' : undefined}
            onClick={() => onSelectPackListView('all')}
          >
            All
          </button>
        </div>
      </div>
      <div>
        <h2>Number of cards</h2>
        <DoubleRangeField
          min={min}
          max={max}
          rangeValues={[minCardsCount, maxCardsCount]}
          onChangeRange={onCardsCountRangeChange}
        />
      </div>
    </div>
  );
};
