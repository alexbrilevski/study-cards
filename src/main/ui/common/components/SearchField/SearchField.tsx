import type { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { IconSvg } from '../IconSvg/IconSvg';
import searchIcon from '../../../../../assets/icons/magnifier.svg';
import s from './SearchField.module.css';

type DefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SearchFieldProps = DefaultInputProps & {
  label?: string;
  onChangeValue?: (value: string) => void;
};

const SearchField: FC<SearchFieldProps> = ({
  label,
  name,
  onChange,
  onChangeValue,
  ...props
}) => {
  const fieldId = name ? name : undefined;

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeValue && onChangeValue(e.currentTarget.value);
  };

  return (
    <div className={s['search-field']}>
      {label && fieldId && <label htmlFor={fieldId}>{label}</label>}
      <div className={s['form-control']}>
        <input id={fieldId} name={name} onChange={onChangeCallback} {...props} />
        <IconSvg src={searchIcon} size={16} />
      </div>
    </div>
  );
};

export default SearchField;
