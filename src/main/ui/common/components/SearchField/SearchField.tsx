import {
  useState,
  type ChangeEvent,
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';
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
  value,
  onChange,
  onChangeValue,
  ...props
}) => {
  const [inputValue, setInputvalue] = useState(value);
  const fieldId = name ? name : undefined;

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    setInputvalue(currentValue);
    onChange && onChange(e);
    onChangeValue && onChangeValue(currentValue);
  };

  return (
    <div className={s['search-field']}>
      {label && fieldId && <label htmlFor={fieldId}>{label}</label>}
      <div className={s['form-control']}>
        <input
          id={fieldId}
          name={name}
          value={inputValue}
          onChange={onChangeCallback}
          {...props}
        />
        <IconSvg src={searchIcon} size={16} />
      </div>
    </div>
  );
};

export default SearchField;
