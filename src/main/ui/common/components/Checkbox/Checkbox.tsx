import type { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import s from './Checkbox.module.css';

type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxProps = DefaultInputProps & {
  onChangeChecked?: (checked: boolean) => void,
  spanClassName?: string,
};

const Checkbox: FC<CheckboxProps> = ({
  type,
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeChecked && onChangeChecked(e.currentTarget.checked);
  }

  const finalInputClassName = `${s['checkbox']} ${className ? className : ''}`

  return (
    <label className={s['checkbox-label']}>
      <input
        type={'checkbox'}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {children &&
        <span className={s['span-class-name']}>
          {children}
        </span>
      }
    </label>
  )
}

export default Checkbox;
