import knex from 'knex';
import env from 'dotenv';
env.config();

const sakilaDB = knex({
    client: process.env.DATABASE_CLIENT,
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: '',
        database: process.env.DATABASE_SAKILA_DB
    },
    pool: { min: 0, max: 10 }
});

const userDB = knex({
    client: process.env.DATABASE_CLIENT,
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: '',
        database: process.env.DATABASE_USER_DB
    },
    pool: { min: 0, max: 10 }
});

export{
    sakilaDB,
    userDB
}
