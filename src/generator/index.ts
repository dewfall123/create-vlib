import { src, dest } from 'gulp';
// import { TEMPLATE_NAME } from '../constants';
import template from 'gulp-template';
import { Meta } from '../prompt';

export async function generator(meta: Meta) {
    return new Promise((resolve, reject) => {
        src(['./temp/**/**'], { dot: true })
            .pipe(
                template(
                    { projectName: meta.name, ...meta },
                    {
                        evaluate: /<% .* %>/,
                    },
                ).on('error', (err) => {
                    reject(err);
                }),
            )
            .pipe(dest(meta.name))
            .on('error', (err) => {
                reject(err);
            })
            .on('end', () => {
                resolve();
            });
    });
}
