import globby from 'globby';
import { log } from '../utils';
import { mkdirSync } from 'fs';
import { Meta } from '../prompt';

async function checkDir(name: string) {
    const list = await globby('*', { onlyDirectories: true });
    if (list.includes(name)) {
        const msg = `Directory ${name} already exists.`;
        log.error(msg);
        throw new Error(msg);
    }
}

export async function createDir(meta: Meta) {
    await checkDir(meta.name);

    await mkdirSync(meta.name);

    return meta.name;
}
