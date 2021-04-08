module.exports = class TestController {
    constructor(router) {
        router.get('/test', this.GetIndex)
    }

    GetIndex(req, res) {
        res.status(200).send('这是个API请求')
    }
}