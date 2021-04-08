const express = require('express')

module.exports = class Routers {
    Router = express.Router()
    modules = []

    constructor() {
        this.init()
    }

    init() {
        this.makeModules()
        this.modules.forEach(mod => {
            new mod(this.Router)
        })
    }

    makeModules() {
        this.modules.push(
            require('./test_controller')
        )
    }
}