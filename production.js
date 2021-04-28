const {CreateApp} = require('./application/main')
const fs = require('fs')
const path = require('path')
const resolve = p => path.resolve(__dirname, p)

async function run() {
    const app = await CreateApp(),
        compression = require('compression'),
        serverStatic = require('serve-static')
    app.use(compression())
    app.use(serverStatic(resolve('dist/client'), {index: false}))
    app.use('*', renderIndex())
    return app.listen(global.CONFIG.app.port)
}

function renderIndex() {
    return async (req, res) => {
        try {
            const url = req.originalUrl
            let template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
            const manifest = JSON.parse(fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'))
            const render = require('./dist/server/entry-server.js').render
            const [html, preloadLinks] = await render(url, manifest)
            const htmlStr = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--main-html-->`, html)
            res.status(200).set({'Content-Type': 'text/html'}).end(htmlStr)
        } catch (e) {
            console.error(e)
            res.status(500).end(e.stack)
        }
    }
}


run().then(() => {
    console.log(`server is run`)
    console.log(`http://localhost:${global.CONFIG.app.port}`)
}).catch(err => {
    console.error(err)
})
