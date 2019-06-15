var db=require('../dbs/db')
module.exports={
    all: ()=>{
        return db.load("select * from Accounts")
    },
    add: (object) => {
        return db.add('accounts', object)
    },
    update: (object) => {
        return db.update('accounts', object)
    },
    delete: (id) => {
        return db.delete('accounts', "id", id)
    }
}