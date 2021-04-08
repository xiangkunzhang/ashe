const fs = require('fs')
const path = require('path')
const toml = require('@iarna/toml')

module.exports = class Config {
    filePath = path.join(process.cwd(), 'config.toml')
    config = {}

    constructor() {
        this.initConfig()
    }

    initConfig() {
        const configFileBuffer = fs.readFileSync(this.filePath, 'utf-8')
        const configFileStr = configFileBuffer.toString()
        const configObj = toml.parse(configFileStr)
        global.CONFIG = configObj
        this.config = configObj
    }
}