/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-02-10 21:05:39
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-10 21:09:11
 * @FilePath: /mock-api-serve/ecosystem.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

module.exports = {
    apps: [
        {
            name: 'nest-app', // 应用名称
            log_date_format: 'YYYY-MM-DD HH:mm:ss', // 日志格式
            script: 'dist/main.js', // 入口文件
            out_file: './pm2log/file.log', // 日志文件
            error_file: './pm2log/file_error.log', // 错误日志文件
            instances: 'max', // 根据 CPU 核心数启动多个实例
            exec_mode: 'cluster', // 使用 cluster 模式
            autorestart: true, // 自动重启
            watch: false, // 不监听文件变化
            max_memory_restart: '1G', // 内存超过 1G 时重启
            env: {
                NODE_ENV: 'production',
                APP_ENV: 'production',
            },
        },
    ],
};
