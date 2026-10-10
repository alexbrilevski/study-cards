import type { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, KeyboardEvent } from 'react';
import s from './InputText.module.css';

type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextProps = DefaultInputProps & {
  onChangeText?: (value: string) => void,
  onEnter?: () => void,
  error?: string,
  spanClassName?: string,
};

const InputText: FC<InputTextProps> = ({
  type,
  onChange,
  onChangeText,
  onKeyDown,
  onEnter,
  error,
  className,
  spanClassName,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(e);
    onEnter && e.key === 'Enter' && onEnter();
  }

  const finalSpanClassName = `${s['error']} ${spanClassName ? spanClassName : ''}`;
  const finalInputClassName = `${s['input-text']} ${error ? s['input-error'] : ''} ${className ? className : ''}`;

  return (
    <>
      <input
        type={'text'}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </>
  );
};

export default InputText;
