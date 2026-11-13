import type {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import s from './InputRadio.module.css';

type DefaultRadioProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Option = string | number | readonly string[] | undefined;

type InputRadioProps = DefaultRadioProps & {
  options?: Option[];
  onChangeOption?: (option: string) => void;
};

const InputRadio: FC<InputRadioProps> = ({
  type,
  name,
  options,
  value,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value);
  };

  const mappedOptions: ReactElement[] = options
    ? options.map((o, i) => (
        <label key={name + '-' + i} className={s['label']}>
          <input
            className={s['radio']}
            type={'radio'}
            name={name}
            value={o}
            checked={o === value}
            onChange={onChangeCallback}
            {...restProps}
          />
          {o}
        </label>
      ))
    : [];

  return <div className={s['radio-buttons']}>{mappedOptions}</div>;
};

export default InputRadio;
