import { useState, type FC } from 'react';
import InputText from '../InputText/InputText';
import { IconSvg } from '../IconSvg/IconSvg';
import editIcon from '../../../../../assets/icons/edit.svg';
import s from './EditableTextField.module.css';

type EditableTextProps = {
  text: string;
  inputLabel?: string;
  inputName?: string;
  error?: string;
  disabled?: boolean;
  onSave: (text: string) => void;
};

export const EditableText: FC<EditableTextProps> = ({
  text,
  inputLabel,
  inputName,
  error,
  disabled,
  onSave,
}) => {
  const [value, setValue] = useState<string>(text);
  const [inputError, setInputError] = useState<string | undefined>(error);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveText = () => {
    if (value.trim().length === 0) {
      setInputError('Required');
      return;
    }

    if (error) setInputError('');
    setEditMode(false);
    onSave(value);
  };

  return (
    <div className={s['editable-text-field']}>
      {editMode ? (
        <>
          <InputText
            label={inputLabel}
            name={inputName}
            value={value}
            error={inputError}
            onChangeText={setValue}
          />
          <button
            className={`${s['action-button']} ${s['save-button']}`}
            onClick={handleSaveText}
            disabled={disabled}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span className={s['current-text']}>{value}</span>
          <button
            className={`${s['action-button']} ${s['edit-button']}`}
            onClick={handleEditClick}
            disabled={disabled}
          >
            <IconSvg src={editIcon} size={16} />
          </button>
        </>
      )}
    </div>
  );
};
