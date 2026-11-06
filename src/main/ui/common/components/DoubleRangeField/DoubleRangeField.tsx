import {
  useEffect,
  useState,
  type ChangeEvent,
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';
import s from './DoubleRangeField.module.css';

type DefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type DoubleRangeFieldProps = DefaultInputProps & {
  onChangeRange?: (value: [number, number]) => void;
  rangeValues?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

const DoubleRangeField: FC<DoubleRangeFieldProps> = ({
  type,
  value,
  rangeValues,
  onChange,
  onChangeRange,
  min,
  max,
  step,
  disabled,
  ...restProps
}) => {
  const initMin = min ? min : 0;
  const initMax = max ? max : 100;
  const stepValue = step ? step : 1;
  const initMinValue = rangeValues ? rangeValues[0] : initMin;
  const initMaxValue = rangeValues ? rangeValues[1] : initMax;

  const [minValue, setMinValue] = useState(initMinValue);
  const [maxValue, setMaxValue] = useState(initMaxValue);

  useEffect(() => {
    setMinValue(min as number);
    setMaxValue(max as number);
  }, [min, max]);

  const getPercent = (value: number) =>
    Math.round(((value - initMinValue) / (initMaxValue - initMinValue)) * 100);

  const setRangeFill = (minVal: number, maxVal: number) => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    return { left: `${minPercent}%`, width: `${maxPercent - minPercent}%` };
  };

  const onMinValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Math.min(+e.currentTarget.value, maxValue);
    if (value < initMinValue) {
      value = initMinValue;
    }
    setMinValue(value);
    onChangeRange && onChangeRange([value, maxValue]);
  };

  const onMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Math.max(+e.currentTarget.value, minValue);
    if (value > initMaxValue) {
      value = initMaxValue;
    }
    setMaxValue(value);
    onChangeRange && onChangeRange([minValue, value]);
  };

  return (
    <div className={s['double-range-field']}>
      <input
        className={s['double-range-input']}
        type={'number'}
        value={minValue}
        min={initMinValue}
        max={initMaxValue}
        onChange={onMinValueChange}
      />
      <div className={s['double-range']}>
        <div className={s['double-range-track']} />
        <div
          className={s['double-range-fill']}
          style={setRangeFill(minValue, maxValue)}
        />
        <input
          type={'range'}
          value={minValue}
          onChange={onMinValueChange}
          className={s['double-range-thumb']}
          style={{ zIndex: minValue === maxValue && minValue !== 0 ? 1 : 0 }}
          min={initMinValue}
          max={initMaxValue}
          step={stepValue}
          disabled={disabled}
          {...restProps}
        />
        <input
          type={'range'}
          value={maxValue}
          onChange={onMaxValueChange}
          className={s['double-range-thumb']}
          min={initMinValue}
          max={initMaxValue}
          step={stepValue}
          disabled={disabled}
          {...restProps}
        />
      </div>
      <input
        className={s['double-range-input']}
        type={'number'}
        value={maxValue}
        min={initMinValue}
        max={initMaxValue}
        onChange={onMaxValueChange}
      />
    </div>
  );
};

export default DoubleRangeField;
