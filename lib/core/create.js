const program = require('commander')
const {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStore
} = require('./action')


// 用户输入command指令的时候，会执行action
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone repository into a folder')
    // .action((project, others) => {
    //     console.log(project, others);
    // })
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add vue component，例如: jing addcpn HelloWorld [-d src/components]')
    .action((name) => {
      // 第二个参数通过program读取-d传进来的路径，若没传值，就使用默认路径
      addComponentAction(name, program.dest || 'src/views')
    })

  program
    .command('addpage <page>')
    .description('add vue pageand router config，例如: jing addpage Home [-d src/pages]')
    .action((page) => {
      // 第二个参数通过program读取-d传进来的路径，若没传值，就使用默认路径
      addPageAndRoute(page, program.dest || 'src/views')
    })

  program
    .command('addstore <store>')
    .description('add vue store config，例如: jing addpage Home [-d src/store]')
    .action((store) => {
      // 第二个参数通过program读取-d传进来的路径，若没传值，就使用默认路径
      addStore(store, program.dest || 'src/store/modules')
    })
}

module.exports = createCommands