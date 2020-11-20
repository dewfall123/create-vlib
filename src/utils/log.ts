import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

const format = (label: string, msg: string) => {
    return msg
        .split('\n')
        .map((line, i) => {
            return i === 0
                ? `${label} ${line}`
                : line.padStart(stripAnsi(label).length);
        })
        .join('\n');
};

const chalkTag = (msg: string) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const log = {
    info: (msg: string, tag?: string) => {
        console.log(
            format(
                chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''),
                msg,
            ),
        );
    },
    succes: (msg: string, tag?: string) => {
        console.log(
            format(
                chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''),
                msg,
            ),
        );
    },
    warn: (msg: string, tag?: string) => {
        format(
            chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''),
            chalk.yellow(msg),
        );
    },
    error: (msg: string, tag?: string) => {
        console.error(
            format(
                chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''),
                chalk.red(msg),
            ),
        );
    },
};
