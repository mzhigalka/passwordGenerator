import React from "react";
import "./scss/index.scss";
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const passwordValues = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  const symbols = "!@#$%^&()_+?><:{}[]";
  const numbers = "0123456789";
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const isValidPasswordLength = (length: number) => length >= 8 && length <= 16;

  const [result, setResult] = React.useState<string>("2UYsAhMd");
  const [lengthPassword, setLengthPassword] = React.useState<number>(passwordValues[0]);
  const [isSymbolsUse, setIsSymbolsUse] = React.useState<boolean>(false);
  const [isNumbersUse, setIsNumbersUse] = React.useState<boolean>(false);
  const [isPasswordCopy, setIsPasswordCopy] = React.useState<boolean>(false);

  const handlePasswordGenerator = () => {
    let currentResult = "";

    if (isSymbolsUse) {
      chars += symbols;
    }
    if (isNumbersUse) {
      chars += numbers;
    }

    for (let i = 0; i < lengthPassword; i += 1) {
      const randomNamber = Math.floor(Math.random() * chars.length);
      currentResult += chars.substring(randomNamber, randomNamber + 1);
    }

    setResult(currentResult);
  };

  const handleSymbolsUse = () => {
    setIsSymbolsUse(!isSymbolsUse);
  };

  const handleNumberssUse = () => {
    setIsNumbersUse(!isNumbersUse);
  };

  const handlePasswordCopy = () => {
    if (result) {
      let timerId: number | null = null;

      navigator.clipboard.writeText(result).then(() => {
        setIsPasswordCopy(true);

        timerId = window.setTimeout(() => {
          setIsPasswordCopy(false);
          if (timerId !== null) {
            clearTimeout(timerId);
          }
        }, 3000);
      });
    }
  };

  const handleLenghtPassword = () => {
    if (!isValidPasswordLength(lengthPassword)) {
      const errorMessage = lengthPassword < 8
        ? "Длинна пароля слишком короткая. Минимальная длина - 8 символов."
        : "Длинна пароля слишком длинная. Максимальная длина - 16 символов.";

      toast.error(errorMessage);
    }
  }

  const variants = {
    initial: {
      y: -25,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeIn'
      }
    }
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
        <label htmlFor="checkbox2" />
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
        <label htmlFor="checkbox3" />
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
        <label htmlFor="checkbox4" />
      </div>
      <button
        onClick={
          lengthPassword > 16 || lengthPassword < 8
            ? handleLenghtPassword
            : handlePasswordGenerator
        }
      >
        Сгенерировать
      </button>
      <button onClick={handlePasswordCopy} className="btn-copy">
        Копировать
      </button>
      <AnimatePresence>
        {isPasswordCopy &&
          <motion.span
            className="password-copy"
            animate='animate'
            initial="initial"
            exit='exit'
            variants={variants}
          >
            Скопировано!
          </motion.span>}
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

export default App;
