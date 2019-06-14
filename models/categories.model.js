var db = require('../dbs/db')
module.exports = {
    all: () => {
        return db.load("select * from categories")
    },
    add: (object) => {
        return db.add('categories', object)
    },
    update: (object) => {
        return db.update('categories', object)
    },
    delete: (id) => {
        return db.delete('categories', "id", id)
    }
}