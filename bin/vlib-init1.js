#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const glob = require('glob');
const latestVersion = require('latest-version');
const spawn = require('child_process').spawn;
const ora = require('ora');
const rm = require('rimraf').sync;

// file
const dowload = require('../lib/download');
const log = require('../utils/log');
const generator = require('../lib/generator');
const CONST = require('../conf/const');
const templateConfig = require('../conf/template.json');
const configDefalut = require('../conf/index');
program.usage('<project-name>').parse(process.argv);

// 根据输入，获取项目名称
let projectName = program.args[0];
if (!projectName) {
    program.help();
    return;
}

// 返回 Node.js 进程的当前工作目录
const rootName = path.basename(process.cwd());
// 项目初始化
main();
/**
 * 主进程main函数
 */
async function main() {
    let projectRoot, templateName;
    try {
        console.log('检测版本');
        // 检测版本
        const isUpate = await checkVersion();
        // 更新版本
        if (isUpate) await updateCli();
        // 检测路径
        projectRoot = await checkDir();
        // 创建路径
        makeDir(projectRoot);
        // 选择模板
        let { git } = await selectTemplate();
        // 下载模板
        templateName = await dowload(rootName, git);
        // 本地配置
        let customizePrompt = await getCustomizePrompt(
            templateName,
            CONST.CUSTOMIZE_PROMPT,
        );
        // 渲染本地配置
        await render(projectRoot, templateName, customizePrompt);
        // 删除无用文件
        deleteCusomizePrompt(projectRoot);
        // 构建结束
        afterBuild();
    } catch (err) {
        log.error(`[vlib] ${err.message}`);
        afterError(projectRoot, templateName);
    }
}

/**
 * 检测路径
 */
function checkDir() {
    return new Promise(async (resolve, reject) => {
        const list = glob.sync('*'); // 遍历当前目录
        if (list.length) {
            if (
                list.filter((name) => {
                    const fileName = path.resolve(
                        process.cwd(),
                        path.join('.', name),
                    );
                    const isDir = fs.statSync(fileName).isDirectory();
                    return name.indexOf(projectName) !== -1 && isDir;
                }).length !== 0
            ) {
                log.error(`项目${projectName}已经存在`);
                reject(`项目${projectName}已经存在`);
            }
            resolve(projectName);
        } else if (rootName === projectName) {
            let answer = await inquirer.prompt([
                {
                    name: 'buildInCurrent',
                    message:
                        '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目',
                    type: 'confirm',
                    default: true,
                },
            ]);
            resolve(answer.buildInCurrent ? '.' : projectName);
        } else {
            resolve(projectName);
        }
    });
}
// 创建路径
function makeDir(projectRoot) {
    if (projectRoot !== '.') {
        fs.mkdirSync(projectName);
    }
}

/**
 * 模板选择
 */
function selectTemplate() {
    return new Promise((resolve) => {
        let choices = Object.values(templateConfig).map((item) => {
            return {
                name: item.name,
                value: item.value,
            };
        });
        let config = {
            // type: 'checkbox',
            type: 'list',
            message: '请选择创建项目类型',
            name: 'select',
            choices: [new inquirer.Separator('模板类型'), ...choices],
        };
        inquirer.prompt(config).then((data) => {
            let { select } = data;
            let { value, git } = templateConfig[select];
            resolve({
                git,
                // templateValue: value
            });
        });
    });
}
/**
 * 渲染模板
 * @param projectRoot 渲染文件路径
 * @param templateName 模板地址
 * @param customizePrompt 模板自定义选项
 */
function render(projectRoot, templateName, customizePrompt) {
    return new Promise(async (resolve, reject) => {
        try {
            let context = {
                name: projectRoot, // 项目文件名
                root: projectRoot, // 项目文件路径
                downloadTemp: templateName, // 模板位置
            };
            // 获取默认配置
            const promptArr = configDefalut.getDefaultPrompt(context);
            // 添加模板自定义配置
            promptArr.push(...customizePrompt);
            let answer = await inquirer.prompt(promptArr);
            let generatorParam = {
                metadata: {
                    ...answer,
                },
                src: context.downloadTemp,
                dest: context.root,
            };
            await generator(generatorParam);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}
/**
 *
 * @param target 模板路径
 * @param fileName 读取文件名
 */
function getCustomizePrompt(target, fileName) {
    return new Promise((resolve) => {
        const filePath = path.join(process.cwd(), target, fileName);
        if (fs.existsSync(filePath)) {
            console.log('读取模板配置文件');
            let file = require(filePath);
            resolve(file);
        } else {
            console.log('该文件没有配置文件');
            resolve([]);
        }
    });
}
// 删除模板配置文件
function deleteCusomizePrompt(target) {
    // 自定义选项模板路径
    const cusomizePrompt = path.join(
        process.cwd(),
        target,
        CONST.CUSTOMIZE_PROMPT,
    );
    if (fs.existsSync(cusomizePrompt)) {
        rm(cusomizePrompt);
    }
    // 忽略文档路径
    const fileIgnore = path.join(process.cwd(), target, CONST.FILE_IGNORE);
    if (fs.existsSync(fileIgnore)) {
        rm(fileIgnore);
    }
}
/**
 * 模板渲染后执行
 */
function afterBuild() {
    log.succes('创建成功:)');
}

function afterError(rootName) {
    console.log(rootName);
    if (rootName) {
        rm(rootName);
        rm(CONST.TEMPLATE_NAME);
    }
}
