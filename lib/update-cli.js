/**
 * 检测版本
 */
function checkVersion() {
    return new Promise(async (resolve) => {
        let webVersion = await latestVersion(`${CONST.CLI_NAME}`);
        let localVersion = require('../package.json').version;
        console.log(`本地版本${localVersion}, 最新版本${webVersion}`);
        let webVersionArr = webVersion.split('.');
        let localVersionArr = localVersion.split('.');
        let isNew = webVersionArr.some((item, index) => {
            return Number(item) > Number(localVersionArr[index]);
        });
        resolve(isNew);
    });
}
/**
 * 更新脚手架
 */
function updateCli() {
    
    return new Promise(async (resolve) => {
        const promptArr = configDefalut.updateNPMPrompt;
        let { npmType } = await inquirer.prompt(promptArr);
        const spinner = ora(`更新${CONST.CLI_NAME}中`);
        let status;
        switch (npmType) {
            case 'npm':
                spinner.start();
                status = spawn('npm.cmd', ['install', 'vlib-cli', '-g']);
                break;
            case 'cnpm':
                spinner.start();
                status = spawn('cnpm.cmd', ['install', 'vlib-cli', '-g']);
                break;
            case 'yarn':
                spinner.start();
                status = spawn('yarn.cmd', ['add', 'vlib-cli', '-g']);
                break;
        }
        status.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        status.on('close', () => {
            spinner.succeed();
            log.succes('更新成功');
            resolve();
        });
    });
}


module.exports = {
    checkVersion
}