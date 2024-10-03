import { Operator } from './types';

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
});

export const formatInteger = (operand: string) => {
    if (operand === '') return '';

    const [integer, decimal] = operand.split('.');

    if (!decimal) return INTEGER_FORMATTER.format(parseFloat(integer));

    return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
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
