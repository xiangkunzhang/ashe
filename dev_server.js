const {CreateApp} = require('./application/main')
const path = require('path')
const fs = require('fs')
const resolve = p => path.resolve(process.cwd(), p)


function viteServer() {
    const {createServer} = require('vite')
    return createServer({
        root: process.cwd(),
        logLevel: "error",
        server: {middlewareMode: true}
    })
}

function renderIndex(viteDevServer) {
    return async (req, res) => {
        try {
            const url = req.originalUrl
            let template = fs.readFileSync('index.html', 'utf-8')
            const render = (await viteDevServer.ssrLoadModule(resolve('./src/entry-server.js'))).render
            const [html, preloadLinks] = await render(url, {})
            const htmlStr = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--main-html-->`, html)
            res.status(200).set({'Content-Type': 'text/html'}).end(htmlStr)
        } catch (e) {
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    }
}

async function run() {
    const app = await CreateApp()
    const viteDevServer = await viteServer()
    app.use(viteDevServer.middlewares)
    // 监听全部请求到前端页面
    app.use('*', renderIndex(viteDevServer))
    return app.listen(global.CONFIG.app.port)
}

run().then(() => {
    console.log(`server is run`)
    console.log(`http://localhost:${global.CONFIG.app.port}`)
}).catch(err => {
    console.error(err)
})