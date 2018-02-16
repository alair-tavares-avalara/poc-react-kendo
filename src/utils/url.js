export function formatParams(params) {
    return Object.keys(params||{}).map(key => `key=${encodeURIComponent(params[key])}`).join('&');
}