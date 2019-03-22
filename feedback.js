const Pool = require('pg').Pool;
const conopts = {
    user: process.env.database_user,
    password: process.env.database_password,
    host: process.env.database_host,
    database: process.env.database_database
}


const pool = new Pool(conopts);

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

// const newMessage = () => {
// return pool.connect()
//     .then(client => {
//         const newMessages = 'INSERT INTO feedback (username, message) values ';
//         return client.query(newMessages)
//             .then(res => {
//                 client.release();
//                 return res;
//             })
//             .catch(err => {
//                 client.release();
//                 console.error(err);
//             });
//     })
// }

function newMessage(mes){
    console.log("Tässä tulee newMessage: ", mes);
    console.log("Tässä tulee mes.message: ", mes.message)
    return pool.connect()
    .then(client=>{
        let value = [mes.message];
        let sql = "INSERT INTO feedback (username, message) VALUES ($1, $2)";
        return client.query(sql, value)
        // .then(res=>{
        //     let values2 = [thread.topic];
        //     let sql2 = "select viestiketju_id from viestiketjut where viestiketjun_otsikko=$1";
        //     return client.query(sql2, values2)
        //     .then(res=>{
        //         console.log(res);
        //         let mesValues = [thread.alias, thread.message, 2, res.rows[0].viestiketju_id];
        //         let mesSql = "insert into viestit(nimimerkki, viestisisalto, kayttaja_id, viestiketju_id) values ($1, $2, $3, $4)";
        //         return client.query(mesSql, mesValues)
                .then(resp=>{
                    client.release();
                    return resp;
            // })
        // })
        })
    })
}

module.exports = { feedback, newMessage };