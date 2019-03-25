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


const counter= () => {
    return pool.connect()
    .then(client => {
        const fights = 'UPDATE counter SET fights=fights+1 WHERE id=1';
        return client.query(fights)
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            client.release();
            console.error(err);
        })
    })
}

const fights = () => {
    return pool.connect()
        .then(client => {
           const sql = 'SELECT fights FROM counter';
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

   const feedback = () => {
    return pool.connect()
        .then(client => {
           const messages = 'SELECT username, message, created_at, created_on FROM feedback';
            return client.query(messages)
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

function newMessage(mes){
    return pool.connect()
    .then(client=>{
        let value = [mes.username, mes.message];
        let sql = "INSERT INTO feedback (username, message) VALUES ($1, $2)";
        return client.query(sql, value)
                .then(resp=>{
                    client.release();
                    return resp;
        })
    })
}

function deleteAll() {
    return pool.connect()
    .then(client=>{
        let sql = "DELETE FROM feedback";
        return client.query(sql)
        .then(resp=>{
            client.release();
            return resp;
        })
    })
}

function deleteOne() {
    return pool.connect()
    .then(client=>{
        let sql = "DELETE FROM feedback WHERE id=?";
        return client.query(sql)
        .then(resp=>{
            client.release();
            return resp;
        })
    })
}

module.exports = { foods, newFood, counter, fights, feedback, newMessage, deleteAll, deleteOne };