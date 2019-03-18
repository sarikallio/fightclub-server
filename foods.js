const Pool = require('pg').Pool;
const conopts = {
    user: 'sari.kallio.sk@gmail.com',
    password: 'Viikko11-',
    host: 'localhost',
    database: 'postgresql-rigid-39394'
}

const pool = new Pool(conopts);

const users = () => {
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

   module.exports = { users };