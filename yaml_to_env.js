/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-28 02:13:19
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-28 02:27:19
 * @FilePath: /mock-api-serve/yaml_to_env.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 定义文件路径
const YAML_FILE = path.join(__dirname, 'src/config/prod.yml');
const ENV_FILE = path.join(__dirname, '.env');

// 检查YAML文件是否存在
if (!fs.existsSync(YAML_FILE)) {
    console.error(`YAML文件不存在: ${YAML_FILE}`);
    process.exit(1);
}

// 读取YAML文件
try {
    const yamlContent = fs.readFileSync(YAML_FILE, 'utf8');
    const config = yaml.load(yamlContent);

    let envContent = '';
    // 将YAML内容转换为.env格式
    for (const key in config) {
        if (key === 'db') {
            for (const subKey in config[key]) {
                if (subKey === 'mysql') {
                    envContent = `DATABASE_URL=${config[key][subKey]['DATABASE_URL']}\n`;
                }
            }
        }
    }
    // 写入.env文件
    fs.writeFileSync(ENV_FILE, envContent);
    console.log(`变量已成功写入到 ${ENV_FILE}`);
} catch (error) {
    console.error('解析YAML文件时出错:', error);
    process.exit(1);
}
