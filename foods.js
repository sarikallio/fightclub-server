const Pool = require('pg').Pool;
const conopts = {
    user: process.env.database_user,
    password: process.env.database_password,
    host: process.env.database_host,
    database: process.env.database_database
}


const pool = new Pool(conopts);

const foods = () => {
    return pool.connect()
        .then(client => {
           const sql = 'SELECT id, emoji, name FROM foods';
            return client.query(sql)
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
   }

function newFood(newF){
return pool.connect()
.then(client=>{
    let value = [newF.name, newF.emoji];
    let sql = "INSERT INTO foods (name, emoji) VALUES ($1, $2)";
    return client.query(sql, value)
            .then(resp=>{
                client.release();
                return resp;
    })
})
}

   module.exports = { foods, newFood };