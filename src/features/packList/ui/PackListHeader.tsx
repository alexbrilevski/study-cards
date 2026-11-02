import type { FC } from 'react';
import type { CardsPackListView } from './PackList';
import DoubleRangeField from '../../../main/ui/common/components/DoubleRangeField/DoubleRangeField';
import SearchField from '../../../main/ui/common/components/SearchField/SearchField';

type PackListHeaderProps = {
  packName: string;
  minCardsCount: number;
  maxCardsCount: number;
  onSearchByPackName: (packName: string) => void;
  onCardsCountRangeChange: (value: [number, number]) => void;
  onSelectPackListView: (view: CardsPackListView) => void;
};

export const PackListHeader: FC<PackListHeaderProps> = ({
  packName,
  minCardsCount,
  maxCardsCount,
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
          <button onClick={() => onSelectPackListView('my')}>My</button>
          <button onClick={() => onSelectPackListView('all')}>All</button>
        </div>
      </div>
      <div>
        <h2>Number of cards</h2>
        <DoubleRangeField
          rangeValues={[minCardsCount, maxCardsCount]}
          onChangeRange={onCardsCountRangeChange}
          min={minCardsCount}
          max={maxCardsCount}
        />
      </div>
    </div>
  );
};
