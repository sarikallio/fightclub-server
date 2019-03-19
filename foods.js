require('dotenv').config();
const Pool = require('pg').Pool;
const conopts = {
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    database: process.env.database
}

const pool = new Pool(conopts);

const foods = () => {
    return pool.connect()
        .then(client => {
           const sql = 'SELECT name FROM foods';
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

   module.exports = { foods };