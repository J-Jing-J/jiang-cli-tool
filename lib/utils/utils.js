const path = require('path')
const fs = require('fs')

const ejs = require('ejs')

// 使用ejs编译ejs模板
const compile = (templateName, data, callback) => {
  const templatePosition = `../templates/${templateName}`;
  // 需要绝对路径
  const templatePath = path.resolve(__dirname, templatePosition)
  console.log('拼接路径（ejs模板的位置）：', templatePath);
  
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}


// 写入文件操作
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
}


module.exports = {
  compile,
  writeToFile
}