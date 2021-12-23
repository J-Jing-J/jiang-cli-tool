#!/usr/bin/env node

// shebang 指令，根据配置的环境执行文件
// 写相对路径，写绝对路径会有不同操作系统的兼容问题

console.log("jing指令文件执行");

// 库的名字一般叫program
const program = require('commander');

// 帮助和可选信息
const helpOptions = require('./lib/core/help');
helpOptions();

const createCommands = require('./lib/core/create')
createCommands()


// 版本号
// program.version('1.0.0');
program.version(require('./package.json').version);



program.parse(process.argv);

console.log(program.dest);
