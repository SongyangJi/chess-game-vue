module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8080,
        proxy: {
            "/api": {
                target: 'http://localhost:18080',//访问的服务器地址
                changeOrigin: true,//true为开启代理
                //secure: true, // 如果是https接口，需要配置这个参数
                pathRewrite: {

                    '^/api': ''//路径的替换规则
                    /*
                     *这里的配置是正则表达式，以/api开头的路径将会被‘/'替换掉
                     *假如后台文档的接口是 "https://www.cyclv.com/admin/login"
                     *前端调取API接口应写：axios.get('/api/admin/login')
                     */
                }
            }
        }
    }
}