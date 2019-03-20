const Pool = require('pg').Pool;
const conopts = {
    user: DATABASE_URL.user,
    password: DATABASE_URL.password,
    host: DATABASE_URL.host,
    database: DATABASE_URL.database
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