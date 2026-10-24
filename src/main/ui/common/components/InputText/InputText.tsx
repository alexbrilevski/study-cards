import {
  useState,
  type ChangeEvent,
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { IconSvg } from '../IconSvg/IconSvg';
import eyeIcon from '../../../../../assets/icons/eye.svg';
import eyeSlashIcon from '../../../../../assets/icons/eye-slash.svg';
import s from './InputText.module.css';

type DefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputTextProps = DefaultInputProps & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
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
  const [inputType, setInputType] = useState<string | undefined>(type);
  const isPasswordInput = type === 'password';

  const handleChangeInputType = () => {
    setInputType(prevType => {
      if (isPasswordInput) {
        return prevType === 'password' ? 'text' : 'password';
      } else {
        return prevType;
      }
    });
  };

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  };

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(e);
    onEnter && e.key === 'Enter' && onEnter();
  };

  const finalSpanClassName = `${s['error']} ${spanClassName ? spanClassName : ''}`;
  const finalInputClassName = `${s['input']} ${error ? s['input-error'] : ''} ${className ? className : ''}`;

  return (
    <div className={s['form-group']}>
      <input
        type={inputType}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
      {isPasswordInput && (
        <button type={'button'} className={s['toggle-button']} onClick={handleChangeInputType}>
          <IconSvg
            src={inputType === 'password' ? eyeIcon : eyeSlashIcon}
            size={24}
          />
        </button>
      )}
    </div>
  );
};

export default InputText;
