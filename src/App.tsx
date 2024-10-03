import { useCalculator } from './hooks/useCalculator';
import css from './styles.module.scss';
import { formatInteger } from './utils';

function App() {
    const {
        currOperand,
        storedOperand,
        inputDigit,
        clearAllInputs,
        deleteDigit,
        chooseOperator,
        operator,
        evaluateEqual
    } = useCalculator();

    return (
        <div className={css.container}>
            <div className={css.output}>
                <div className={css.storedOperand}>
                    {formatInteger(storedOperand)} {operator}
                </div>
                <div className={css.currOperand}>
                    {formatInteger(currOperand)}
                </div>
            </div>
            <button onClick={() => clearAllInputs()}>C</button>
            <button onClick={() => deleteDigit()}>DEL</button>
            <button onClick={() => chooseOperator('÷')}>÷</button>
            <button onClick={() => chooseOperator('×')}>×</button>
            <button onClick={() => inputDigit('7')}>7</button>
            <button onClick={() => inputDigit('8')}>8</button>
            <button onClick={() => inputDigit('9')}>9</button>
            <button onClick={() => chooseOperator('-')}>-</button>

            <button onClick={() => inputDigit('4')}>4</button>
            <button onClick={() => inputDigit('5')}>5</button>
            <button onClick={() => inputDigit('6')}>6</button>
            <button onClick={() => chooseOperator('+')}>+</button>

            <button onClick={() => inputDigit('1')}>1</button>
            <button onClick={() => inputDigit('2')}>2</button>
            <button onClick={() => inputDigit('3')}>3</button>
            <button onClick={() => evaluateEqual()} className={css.spanRowTwo}>
                =
            </button>
            <button onClick={() => inputDigit('0')} className={css.spanColTwo}>
                0
            </button>
            <button onClick={() => inputDigit('.')}>.</button>
        </div>
    );
}

export default App;
