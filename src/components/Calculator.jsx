import { useEffect, useState } from "react"
import './calculatorStyle.css'

const Calculator = () => {
  const [displayedNum, setDisplayedNum] = useState('0')
  const [firstValue, setFirstValue] = useState('')
  const [operator, setOperator] = useState('')
  const [previousKeyType, setPreviousKeyType] = useState('')

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const calculate = (n1, operator, n2) => {
    console.log(n1, n2, operator)
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
  }

  const getKeyType = (key) => {
    const { action } = key.dataset
    if (!action) return 'number'
    if (['add', 'subtract', 'multiply', 'divide'].includes(action)) return 'operator'

    return action
  }

  const handleKeyPress = (event) => {
    const key = event.key
    const keyToButtonMap = {
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      '7': '7',
      '8': '8',
      '9': '9',
      '4': '4',
      '5': '5',
      '6': '6',
      '1': '1',
      '2': '2',
      '3': '3',
      '0': '0',
      '.': 'decimal',
      'Backspace': 'clear',
      'e': 'calculate'
    }

    if (keyToButtonMap.hasOwnProperty(key)) {
      const buttonId = keyToButtonMap[key];
      const button = document.getElementById(buttonId);
      if (button) {
        button.click();
      }
    }
  }

  const handleButtonClick = (key) => {
    const keyType = getKeyType(key);
    let resultString;

    if (keyType === 'number') {
      resultString = displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate' || previousKeyType === 'clear'
        ? key.textContent
        : displayedNum + key.textContent;
    } else if (keyType === 'decimal') {
      const displayedNumStr = String(displayedNum)

      if (!displayedNumStr.includes('.')) {
        resultString = displayedNumStr + '.';
      } else {
        resultString = displayedNumStr;
      }
      if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        resultString = '0.';
      }
    } else if (keyType === 'operator') {
      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        resultString = calculate(firstValue, operator, displayedNum);
      } else {
        setFirstValue(displayedNum);
        setOperator(key.dataset.action);
        resultString = displayedNum;
      }
    } else if (keyType === 'clear') {
      setFirstValue('')
      setOperator('')
      resultString = 0
    } else if (keyType === 'calculate') {
      resultString = firstValue
        ? previousKeyType === 'calculate'
          ? calculate(displayedNum, operator, displayedNum)
          : calculate(firstValue, operator, displayedNum)
        : displayedNum;
    }
    console.log(firstValue, operator, displayedNum)
    setDisplayedNum(resultString);
    setPreviousKeyType(keyType);
  };


  return (
    <div className="calculator">
      <div className="calc_display">{displayedNum}</div>
      <div className="calc_keys">
        <button id="add" className="key-operator" onClick={() => handleButtonClick({ dataset: { action: 'add' } })}>+</button>
        <button id="subtract" className="key-operator" onClick={() => handleButtonClick({ dataset: { action: 'subtract' } })}>-</button>
        <button id="multiply" className="key-operator" onClick={() => handleButtonClick({ dataset: { action: 'multiply' } })}>&times;</button>
        <button id="divide" className="key-operator" onClick={() => handleButtonClick({ dataset: { action: 'divide' } })}>/</button>

        <button id="7" onClick={() => handleButtonClick({ textContent: '7', dataset: { action: 'number' } })}>7</button>
        <button id="8" onClick={() => handleButtonClick({ textContent: '8', dataset: { action: 'number' } })}>8</button>
        <button id="9" onClick={() => handleButtonClick({ textContent: '9', dataset: { action: 'number' } })}>9</button>
        <button id="4" onClick={() => handleButtonClick({ textContent: '4', dataset: { action: 'number' } })}>4</button>
        <button id="5" onClick={() => handleButtonClick({ textContent: '5', dataset: { action: 'number' } })}>5</button>
        <button id="6" onClick={() => handleButtonClick({ textContent: '6', dataset: { action: 'number' } })}>6</button>
        <button id="1" onClick={() => handleButtonClick({ textContent: '1', dataset: { action: 'number' } })}>1</button>
        <button id="2" onClick={() => handleButtonClick({ textContent: '2', dataset: { action: 'number' } })}>2</button>
        <button id="3" onClick={() => handleButtonClick({ textContent: '3', dataset: { action: 'number' } })}>3</button>
        <button id="0" onClick={() => handleButtonClick({ textContent: '0', dataset: { action: 'number' } })}>0</button>
        
        <button id="decimal" onClick={() => handleButtonClick({ textContent: '.', dataset: { action: 'decimal' } })}>.</button>
        <button id="clear" onClick={() => handleButtonClick({ dataset: { action: 'clear' } })}>AC</button>
        <button id="calculate" className="key-equal" onClick={() => handleButtonClick({ dataset: { action: 'calculate' } })}>=</button>
      </div>
    </div>
  )
}

export default Calculator