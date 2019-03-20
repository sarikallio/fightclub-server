const Pool = require('pg').Pool;
const conopts = {
    user: process.env.DATABASE_URL,
    password: process.env.DATABASE_URL,
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_URL
}


const pool = new Pool(conopts);

const todo = () => {
    return pool.connect()
        .then(client => {
           const sql = 'SELECT name FROM todo';
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

   module.exports = { todo };