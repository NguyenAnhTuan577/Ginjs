var db=require('../dbs/db')
module.exports={
    all: ()=>{
        return db.load("select * from Accounts")
    }
}