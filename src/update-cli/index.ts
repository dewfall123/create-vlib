import latestVersion from 'latest-version';
import { CLI_NAME } from '../constants';
import compareVersions from 'compare-versions';
// import ora from 'ora';

export async function checkVersion() {
    const latestV = await latestVersion(CLI_NAME);
    const localV = require('../../packages.json').version;
    const isStale = compareVersions(localV, latestV) < 0;
    return isStale;
}
