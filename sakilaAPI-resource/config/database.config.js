import knex from 'knex';

const sakilaDB = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'sakila'
    },
    pool: { min: 0, max: 10 }
});

const userDB = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'user'
    },
    pool: { min: 0, max: 10 }
});

export{
    sakilaDB,
    userDB
}
