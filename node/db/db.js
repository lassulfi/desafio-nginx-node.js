const mysql = require('mysql');
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node-nginx-db'
};

const connection = mysql.createConnection(config);

const createTable = `create table if not exists people(id int primary key auto_increment, name varchar(255) not null)`;
connection.query(createTable);

const insertPeople = (name) => {  
    const sql = `insert into people(name) values('${name}')`;
    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error(err);
        }
    });
}

const findNames = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `select name from people`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                if (results == undefined) {
                    console.log('no entries found');
                    reject(new Error('Error results is undefined'))       
                } else {
                    resolve(results);
                }
            }                
        });
        connection.end();
    });
}

const close = () => {
    connection.end();   
}

module.exports = { insertPeople, findNames }