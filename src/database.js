const fs = require("fs")
const env = require('../env.json');
const data = require('../data.json');

const database = {
    data,
    save() {
        fs.writeFile("data.json", JSON.stringify(data), function (err) {
            if (err) { return false }
            console.log(`Data saved to the file data.json.`);
        })
        return true
    }
}
if (env.persist) {
    setInterval(() => {
        database.save()
    }, 10000);
}

module.exports = database
