function getQueryData(url = '') {
    let data = {}
    if (url.indexOf('?') < 0)
        return data;

    let dataPart = url.split("?")[1].split("&")
    for (let index = 0; index < dataPart.length; index++) {
        const key = dataPart[index].split("=")[0]
        const value = dataPart[index].split("=")[1]

        if (value === 'on' || value === 'off' || value === 'true' || value === 'false')
            data[key] = (value === 'on') || (value === 'true')
        else
            data[key] = value
    }
    return data;
}

function getPath(url = '') {
    // remove search query
    if (url.indexOf('?') >= 0)
        url = url.split("?")[0];

    // remove ending / if contains
    if (url[url.length - 1] == '/') {
        url = url.slice(0, url.length - 1)
    }

    // add starting / if not contains
    if (url[0] != '/') {
        url = '/' + url
    }

    return url;
}

function onData(req, res, sendBody) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
        if (body.length > 1e6) {
            req.connection.destroy()
        }
    });
    req.on('end', () => {
        const hasBody = req.rawHeaders.find((h) => h.startsWith("application/json"))
        sendBody(JSON.parse(body))
    });
}

const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
};

module.exports = {
    getQueryData,
    getPath,
    headers,
    onData
}
