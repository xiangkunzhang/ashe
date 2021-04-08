import {createApp} from "@/main";
import {renderToString} from '@vue/server-renderer'

export async function render(url, manifest) {
    const {app, router} = createApp()

    router.push(url)
    await router.isReady()
    const ctx = {}
    const html = await renderToString(app, ctx)
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    return [html, preloadLinks]
}

function renderPreloadLinks(modules, manifest) {
    const seen = new Set()
    let links = ''
    modules.forEach(id => {
        const files = manifest[id]
        if (files) {
            files.forEach(file => {
                if (!seen.has(file)) {
                    seen.add(file)
                    const link = renderPreloadLink(file)
                    if (link) {
                        links += link
                    }
                }
            })
        }
    })
    return links
}

/**
 *
 * @param file{string}
 */
function renderPreloadLink(file) {
    switch (true) {
        case file.endsWith('.js'):
            return `<link rel="modulepreload" crossorigin href="${file}">`;
        case file.endsWith('.css'):
            return `<link rel="stylesheet" href="${file}">`
        default:
            return ''
    }
}