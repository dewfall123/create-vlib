import logSymbols from 'log-symbols';
import chalk from 'chalk';

export const log = {
    info: (...str: any) => {
        console.log(logSymbols.info, chalk.blue(...str));
    },
    succes: (...str: any) => {
        console.log(logSymbols.success, chalk.green(...str));
    },
    warn: (...str: any) => {
        console.log(logSymbols.warning, chalk.yellow(...str));
    },
    error: (...str: any) => {
        console.log(logSymbols.error, chalk.red(...str));
    },
};
