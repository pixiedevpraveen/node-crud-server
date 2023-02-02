const createServer = require('http').createServer;
const views = require('./views');
const helpers = require('./helpers');
const env = require('../env.json');

const requestListener = async function (req, res) {
    res.writeHead(200, helpers.headers);
    try {
        const method = req.method.toUpperCase();
        const path = helpers.getPath(req.url);
        const query = helpers.getQueryData(req.url)
        let currView;

        console.log(path);

        /* Checking for view using path (without query and end '/') */
        if (views.has(path)) {

            if (views.get(path).methods.indexOf(method) >= 0) {
                currView = views.get(path)
            } else throw new Error(`Method ${method} not available for this route!`)

        }
        if (!currView) {
            /* No views found so returning 404 error */
            res.writeHead(404, helpers.headers);
            throw new Error("404 Page Not Found!")
        }

        /* If the method is post or put so we are getting body data */
        if ("POST PUT".indexOf(method) >= 0) {
            helpers.onData(req, res, (_body) => {
                currView.view(req, res, path, query, _body)
            });
        } else if ("GET DELETE".indexOf(method) >= 0) {
            currView.view(req, res, path, query, {})
        } else {
            throw new Error("sdd")
        }

    } catch (er) {
        console.log(er);
        res.end(er.message);
    }
}

const server = createServer(requestListener);
server.listen(env.port, env.host, () => {
    console.log(`Server is running. On Url http://${env.host}:${env.port}/\n`);
})
