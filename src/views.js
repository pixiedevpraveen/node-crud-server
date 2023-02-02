const { headers } = require('./helpers');
const database = require('./database');
const views = new Map()

// All user data
views.set("/", {
    methods: ["GET"], view: function (req, res, path, query, body) {
        res.end(JSON.stringify(database.data.users));
    }
})

// "/user/?username=deepak"
views.set("/user", {
    methods: ["GET"], view: function (req, res, path, query, body) {
        if (query.username) {
            const user = database.data.users.find(u => u.username == query.username)
            if (user) {
                res.end(JSON.stringify(user));
                return;
            }
        }
        res.end("User not found!")
    }
})


/*
    "/user/?username=deepak"
    with data like {"username":"vishal", "name":"vishal"}
 */
views.set("/user/add", {
    methods: ["POST"], view: function (req, res, path, query, body) {
        console.log(body);
        if (body.name && body.username) {
            if (database.data.users.find(u => u.username === body.username.toLowerCase())) {
                res.end("Username taken!")
                return;
            }
            database.data.users.push({ username: body.username.toLowerCase(), name: body.name, id: database.data.users[database.data.users.length - 1].id + 1 })
            res.writeHead(201, headers);
            res.end("added");
        } else res.end("Not added!")

    }
})

views.set("/user/update", {
    methods: ["PUT"], view: function (req, res, path, query, body) {

        if (body.username) {
            const user = database.data.users.find(u => u.username == body.username)
            let updated = false
            if (user) {
                if (body.name) {
                    user.name = body.name
                    updated = true
                }
                // if (body.profile) {
                //     user.profile = body.profile
                //     updated = true
                // }
                if (updated) {
                    res.writeHead(201, headers);
                    res.end("Updated!");
                    return;
                }
                else {
                    res.end("No content!")
                    return;
                }
            }

        }
        res.end("Not updated!")

    }
})

module.exports = views
