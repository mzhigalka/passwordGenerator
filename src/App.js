import './index.scss';
import React from 'react';

function App() {
  const passwordValues = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  const symbols = '!@#$%^&()\_+?><:{}[]';
  const numbers = '0123456789'
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const [result, setResult] = React.useState('2UYsAhMd'); 
  const [lengthPassword, setLengthPassword] = React.useState(passwordValues[0]); 
  const [isSymbolsUse, setIsSymbolsUse] = React.useState(false); 
  const [isNumbersUse, setIsNumbersUse] = React.useState(false); 

  const handlePasswordGenerator = () => {
    let currentResult = '';
  
    if (isSymbolsUse) {
      chars += symbols;
    };
    if (isNumbersUse) {
      chars += numbers;
    };

    for (let i = 0; i < lengthPassword; i += 1) {
      const randomNamber = Math.floor(Math.random() * chars.length);
      currentResult += chars.substring(randomNamber, randomNamber + 1);
    };

    setResult(currentResult);
  };

  const handleSymbolsUse = () => {
    setIsSymbolsUse(!isSymbolsUse);
  };

  const handleNumberssUse = () => {
    setIsNumbersUse(!isNumbersUse);
  };

  return (
    <div className="App">
      <span className="subtitle">Пароль:</span>
      <h2>{result}</h2>
      <div className="row">
        <span>Длина паролья:</span>
        <input 
          className="pwg-length" 
          type="number" 
          value={lengthPassword}
          min={passwordValues[0]}
          max={passwordValues[passwordValues.length - 1]}
          onChange={(e) => setLengthPassword(parseInt(e.target.value))}
        />
      </div>
      <div className="row">
        <span>Строчные буквы:</span>
        <input
          checked={true}
          className="styled-checkbox"
          id="checkbox2"
          type="checkbox"
          value="value1"
        />
        <label for="checkbox2" />
      </div>
        <div className="row">
          <span>Цифры:</span>
          <input 
            className="styled-checkbox" 
            id="checkbox3" 
            type="checkbox" 
            value="value1" 
            onChange={handleNumberssUse}
          />
          <label for="checkbox3" />
        </div>
      <div className="row">
        <span>Символы:</span>
        <input 
          className="styled-checkbox" 
          id="checkbox4" 
          type="checkbox" 
          value="value1"
          onChange={handleSymbolsUse}
        />        
        <label for="checkbox4" />
      </div>

      <button onClick={handlePasswordGenerator}>Сгенерировать</button>
      {/* <button className='btn-copy'>Скопировать</button> */}
    </div>
  );
}

export default App;