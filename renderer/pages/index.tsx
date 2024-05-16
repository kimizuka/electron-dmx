import style from './index.module.scss';
import { useEffect, useState } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  interface Window {
    electron: {
      sendValue: (value: number) => void;
    };
  }
}

export default function IndexPage() {
  const [ value, setValue ] = useState(0);

  useEffect(() => {
    window.electron.sendValue(value);
  }, [value]);

  return (
    <main className={ style.wrapper }>
      <label>
        <input
          type="range"
          min={ 0 }
          max={ 100 }
          step={ 1 }
          value={ value }
          onChange={ (evt) => setValue(Number(evt.target.value)) }
        />
        <input
          type="text"
          readOnly={ true }
          value={ value }
        />
      </label>
    </main>
  );
};
