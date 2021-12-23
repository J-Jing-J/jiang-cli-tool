const program = require('commander');

const helpOptions = () => {

  // 增加自己的help Option
  program.option('-J --jing', 'a jiangjing cli')
  {/* <可选参数> */ }
  program.option('-d --dest <dest>', 'a destination folder, 例如： -d /src/components')
  program.option('-d --framework <framework>', 'your framework')

  program.on('--help', function () {
    console.log("");
    console.log("Other:");
  })

}

module.exports = helpOptions;