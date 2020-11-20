import { src, dest } from 'gulp';
// import { TEMPLATE_NAME } from '../constants';
import replace from 'gulp-replace';
import { Meta } from '../prompt';

export async function generator(meta: Meta) {
    return new Promise((resolve, reject) => {
        src(['./temp/**/**'], { dot: true })
            .pipe(replace('vlibTemplate', meta.name))
            .pipe(replace('_description', meta.description))
            .pipe(dest(meta.name))
            .on('error', (err) => {
                reject(err);
            })
            .on('end', () => {
                resolve();
            });
    });
}
