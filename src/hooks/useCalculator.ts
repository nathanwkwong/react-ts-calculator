import { useState } from 'react';
import { evaluate } from '../utils';
import { Operator } from '../types';

export const useCalculator = () => {
    const [currOperand, setCurrOperand] = useState<string>('');
    const [storedOperand, setStoredOperand] = useState<string>('');
    const [operator, setOperator] = useState<Operator>('');
    const [overWriteCurrOperand, setOverWriteCurrOperand] =
        useState<boolean>(false);

    const inputDigit = (digit: string) => {
        if (digit === '.' && currOperand === '') return;
        if (digit === '.' && currOperand.includes('.')) return;
        if (digit === '0' && currOperand === '0') return;

        if (overWriteCurrOperand) {
            setCurrOperand(digit);
            setOverWriteCurrOperand(false);
            return;
        }

        setCurrOperand((prevOperand) => {
            return prevOperand + digit.toString();
        });
    };

    const clearAllInputs = () => {
        setCurrOperand('');
        setStoredOperand('');
        setOperator('');
    };

    const deleteDigit = () => {
        if (overWriteCurrOperand) {
            setCurrOperand('');
            setOverWriteCurrOperand(false);
            setOperator('');
            return;
        }

        if (currOperand === '') {
            setStoredOperand('');
            setOperator('');
            return;
        }

        setCurrOperand((prevOperand) => {
            return prevOperand.slice(0, -1);
        });
    };

    const chooseOperator = (newOperator: Operator) => {
        // negative number input
        if (newOperator === '-' && currOperand === '' && storedOperand === '') {
            setCurrOperand('-');
            return;
        }

        // alter '-' operator
        if (newOperator === '-' && currOperand === '-') {
            setCurrOperand('');
            return;
        }

        //  prevent operator change if the current operand is '-' only
        if (currOperand === '-') {
            return;
        }

        if (currOperand === '' && storedOperand === '') return;

        if (currOperand === '') {
            setOperator(newOperator);
            return;
        }

        // move the current operand and operator to the stored operand
        if (storedOperand == '') {
            setStoredOperand(
                currOperand[currOperand.length - 1] === '.'
                    ? currOperand.slice(0, currOperand.length - 1)
                    : currOperand
            );
            setCurrOperand('');
            setOperator(newOperator);
            return;
        }

        // calculate the stored operand and current operand with the operator input
        const newEvaluatedValue = evaluate(
            storedOperand,
            currOperand,
            operator
        );

        setStoredOperand(newEvaluatedValue);
        setOperator(newOperator);
        setCurrOperand('');
    };

    const evaluateEqual = () => {
        if (currOperand === '' || storedOperand === '' || operator === '')
            return;

        const result = evaluate(storedOperand, currOperand, operator);
        setStoredOperand('');
        setOperator('');
        setCurrOperand(result);
        setOverWriteCurrOperand(true);
    };

    return {
        currOperand,
        storedOperand,
        inputDigit,
        clearAllInputs,
        deleteDigit,
        chooseOperator,
        operator,
        evaluateEqual
    };
};
