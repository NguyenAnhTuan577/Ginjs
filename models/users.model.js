var db=require('../dbs/db')
module.exports={
    all: ()=>{
        return db.load("select * from Accounts")
    },
    clients: ()=>{
        return db.load("select * from Accounts where type=false")
    },
    admins: ()=>{
        return db.load("select * from Accounts where type=true")
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