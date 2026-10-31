import type { ChangeEvent, DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';
import { IconSvg } from '../IconSvg/IconSvg';
import chewronDown from '../../../../../assets/icons/chevron-down.svg';
import s from './SelectField.module.css';

type DefaultSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SelectFieldProps = DefaultSelectProps & {
  options: string[];
  onChangeOption?: (option: any) => void;
};

const SelectField: FC<SelectFieldProps> = ({
  options,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value);
  };

  return (
    <div className={s['select-field']}>
      <select className={s.select} onChange={onChangeCallback} {...restProps}>
        {options.map((o, i) => (
          <option key={o + '-' + i} value={o} className={s.option}>
            {o}
          </option>
        ))}
      </select>
      <span className={s['arrow-icon']}>
        <IconSvg src={chewronDown} size={8} />
      </span>
    </div>
  );
};

export default SelectField;
