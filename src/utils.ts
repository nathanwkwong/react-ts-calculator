import { INTEGER_FORMATTER, NUM_DECIMAL_DIGITS } from './constants';
import { Operator } from './types';

export const formatInteger = (operand: string) => {
    if (operand === '') return '';
    if (operand === '-') return '-';

    const [integer, decimal] = operand.split('.');

    if (!decimal)
        return operand.includes('.')
            ? INTEGER_FORMATTER.format(parseFloat(integer)) + '.'
            : INTEGER_FORMATTER.format(parseFloat(integer));

    return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal.slice(
        0,
        NUM_DECIMAL_DIGITS
    )}`;
};

export const evaluate = (
    leftOperand: string,
    rightOperand: string,
    operator: Operator
) => {
    const left = parseFloat(leftOperand);
    const right = parseFloat(rightOperand);

    if (isNaN(left) || isNaN(right)) return '';

    switch (operator) {
        case '+':
            return (left + right).toString();
        case '-':
            return (left - right).toString();
        case '×':
            return (left * right).toString();
        case '÷':
            return (left / right).toString();
        default:
            return '';
    }
};
