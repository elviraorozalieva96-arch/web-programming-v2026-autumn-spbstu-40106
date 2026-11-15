import {useState} from 'react';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : `${display}${digit}`);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(`${display}.`);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setOperator(null);
    setValue(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (value === null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      let newValue = currentValue;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }
      setValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (!operator || value === null) {
      return;
    }
    performOperation(null);
    setOperator(null);
  };

  return (
    <div className="calculator">
      <div className="display" data-testid="calculator-display">
        {display}
      </div>
      <div className="keypad">
        <button onClick={clearDisplay} className="key-clear">
          C
        </button>
        <button onClick={toggleSign} className="key-function">
          +/-
        </button>
        <button onClick={inputPercent} className="key-function">
          %
        </button>
        <button onClick={() => performOperation('/')} className="key-operator">
          /
        </button>

        <button onClick={() => inputDigit(7)}>7</button>
        <button onClick={() => inputDigit(8)}>8</button>
        <button onClick={() => inputDigit(9)}>9</button>
        <button onClick={() => performOperation('*')} className="key-operator">
          *
        </button>

        <button onClick={() => inputDigit(4)}>4</button>
        <button onClick={() => inputDigit(5)}>5</button>
        <button onClick={() => inputDigit(6)}>6</button>
        <button onClick={() => performOperation('-')} className="key-operator">
          -
        </button>

        <button onClick={() => inputDigit(1)}>1</button>
        <button onClick={() => inputDigit(2)}>2</button>
        <button onClick={() => inputDigit(3)}>3</button>
        <button onClick={() => performOperation('+')} className="key-operator">
          +
        </button>

        <button onClick={() => inputDigit(0)} className="key-zero">
          0
        </button>
        <button onClick={inputDot}>.</button>
        <button onClick={handleEquals} className="key-equals">
          =
        </button>
      </div>
    </div>
  );
}
