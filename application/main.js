const express = require('express')
const Router = require('./controllers/index')
const Config = require('./loaders/config')

module.exports.CreateApp = async function () {
    const app = express()
    const router = new Router()
    new Config()
    app.use('/api', router.Router)
    return app
}