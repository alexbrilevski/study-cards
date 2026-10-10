import { useState } from 'react';
import InputText from '../../main/ui/common/components/InputText/InputText';
import Button from '../../main/ui/common/components/Button/Button';
import Checkbox from '../../main/ui/common/components/Checkbox/Checkbox';
import s from './Test.module.css';

export const Test = () => {
  const [text, setText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const showAlert = () => {
    alert(text);
  };

  return (
    <div>
      <h1>Test</h1>
      <div className={s['column']}>
        <InputText
          value={text}
          onChangeText={setText}
          onEnter={showAlert}
        />
        <Button onClick={showAlert}>
          Some button
        </Button>
        <Checkbox checked={checked} onChangeChecked={setChecked}>
          Some text
        </Checkbox>
      </div>
    </div>
  );
};