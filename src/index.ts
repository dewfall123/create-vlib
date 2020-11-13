import program from 'commander';
import { CLI_NAME } from './constants';
import { createDir } from './create-dir';
import { generator } from './generator';
import { download } from './template';
import { log } from './utils';
import del from 'del';
import { TEMPLATE_NAME } from './constants';
import { prompt } from './prompt';

export async function cli() {
    program.usage('<project-name>').parse(process.argv);

    const argProjectName = program.args[0];
    // const root = process.cwd();
    let createdFile;
    try {
        const meta = await prompt(argProjectName);

        createdFile = await createDir(meta);

        await download(meta);

        await generator(meta);

        clean();
    } catch (err) {
        log.error(err);
        log.warn(`[${CLI_NAME}] failed.`);
        if (createdFile) {
            del(createdFile);
        }
        // clean();
    }

    function clean() {
        del(TEMPLATE_NAME);
    }
}
