// module.exports = {
//   // 基本路径
//   publicPath: './',
//   // 生产环境是否生成 sourceMap 文件
//   //productionSourceMap: false, //把这个改为false。
//   /*不然在最终打包的文件中会出现一些map文件，
//   map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
//   有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错 */

//   // 服务器端口号
//   // devServer: {
//   // port: 1234,
//   // },
//  }
const Timestamp = new Date().getTime();
const app_version = '1.0.7'
module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  // devServer: {
  //   proxy: {
  //     '/api': {    // search为转发路径
  //       target: 'http://xxe.yuncshop.com',  // 目标地址
  //       secure: true,  // 如果是https接口，需要配置这个参数
  //       ws: true, // 是否代理websockets
  //       changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL,               
  //     }
  //   }
  // },
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${app_version}.${Timestamp}.js`,
      chunkFilename: `[name].${app_version}.${Timestamp}.js`
    },
  },
};