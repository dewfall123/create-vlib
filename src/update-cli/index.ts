import latestVersion from 'latest-version';
import { CLI_NAME } from '../constants';
import compareVersions from 'compare-versions';
import inquirer from 'inquirer';
import ora from 'ora';
import { spawn } from 'child_process';
import { log } from '../utils';

async function checkVersion() {
    try {
        const latestV = await latestVersion(CLI_NAME);
        const localV = require(`${CLI_NAME}/packages.json`).version;
        const isStale = compareVersions(localV, latestV) < 0;
        return isStale;
    } catch {
        return false;
    }
}

export async function updateCli() {
    try {
        const isStale = await checkVersion();
        if (!isStale) {
            return;
        }

        const spinner = ora(`更新${CLI_NAME}中...`);
        const { npmType } = await inquirer.prompt([
            {
                type: 'list',
                message: `请选择更新${CLI_NAME}的方法`,
                name: 'npmType',
                choices: [
                    {
                        name: 'yarn',
                        message: 'yarn',
                    },
                    {
                        name: 'npm',
                        message: 'npm',
                    },
                    {
                        name: 'cnpm',
                        message: 'cnpm',
                    },
                ],
            },
        ]);
        spinner.start();
        const status = spawn(`${npmType}.cmd`, [
            npmType === 'yarn' ? 'add' : 'install',
            'vitepress-dg-cli',
            '-g -D',
        ]);
        return new Promise((resolve) => {
            status.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            status.on('close', () => {
                spinner.succeed();
                log.succes('更新完成');
                resolve();
            });
            status.on('error', () => {
                spinner.fail();
                log.warn('更新失败');
                resolve();
            });
        });
    } catch (err) {
        log.warn(`检查${CLI_NAME}版本失败`);
        // log.warn(err);
    }
}
