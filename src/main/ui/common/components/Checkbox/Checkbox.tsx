import type { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import s from './Checkbox.module.css';

type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxProps = DefaultInputProps & {
  onChangeChecked?: (checked: boolean) => void,
};

const Checkbox: FC<CheckboxProps> = ({
  type,
  onChange,
  onChangeChecked,
  className,
  children,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeChecked && onChangeChecked(e.currentTarget.checked);
  }

  const finalInputClassName = `${s['checkbox']} ${className ? className : ''}`

  return (
    <div className={s['form-group']}>
      <label className={s['checkbox-label']}>
        <input
          type={'checkbox'}
          onChange={onChangeCallback}
          className={finalInputClassName}
          {...restProps}
        />
        {children && <span>{children}</span>}
      </label>
    </div>
  )
}

export default Checkbox;
