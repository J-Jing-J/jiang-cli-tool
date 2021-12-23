// promisify 可以将回调函数转换成promise形式 -> 就可以用async了
const { promisify } = require('util')
const download = promisify(require('download-git-repo'));
const open = require('open');
const path = require('path');

// 导入GitHub的地址

const { vueRepo } = require('../config/repo-config')
// 执行命令
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile
} = require('../utils/utils')

// 创建项目并下载依赖
const createProjectAction = async (project) => {

  console.log('jiangjing-cli正在帮助您创建项目');

  // 1.clone项目
  // 第二个参数是用户传入的项目（文件夹）名称
  // 第三个参数代表是否下载.git文件等
  await download(vueRepo, project, { clone: true });

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 4.打开浏览器
  open("http://localhost:8080/")

  // 3.运行npm run serve 
  await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  // 不加await是为了不阻塞后边的代码，否则不能打开浏览器，或者把打开浏览器放在前面
  // commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
}



// 添加组件的action
// 前端用的最多的模板：ejs
const addComponentAction = async (name, dest) => {
  // 1.创建ejs模板

  // 2.编译ejs模板
  const result = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() })
  console.log(result);

  // 3.将result写入.vue文件中
  const targetPath = path.resolve(dest, `${name}.vue`)
  console.log(targetPath);
  writeToFile(targetPath, result)

  // 4.放到对应的文件夹中
}


const addPageAndRoute = async (name, dest) => {
  // 编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile('vue-component.ejs', data);
  const RouteResult = await compile('vue-router.ejs', data)

  // 写入文件
  const targetPagePath = path.resolve(dest, `${name}.vue`)
  const targetRoutePath = path.resolve(dest, 'router.js')

  writeToFile(targetPagePath, pageResult)
  writeToFile(targetRoutePath, RouteResult)

}

const addStore = async (name, dest) => {
  // 编译ejs模板
  const storeResult = await compile('vue-store.ejs', {});
  const typeResult = await compile('vue-types.ejs', {});


  // 写入文件
  const targetStorePath = path.resolve(dest, `${name}.vue`)
  const targetTypesPath = path.resolve(dest, 'router.js')

  writeToFile(targetStorePath, storeResult)
  writeToFile(targetTypesPath, typeResult)

}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStore
}