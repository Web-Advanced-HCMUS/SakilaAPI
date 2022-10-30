import mysql from 'mysql2';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const createConection = () => {
  const connection = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    connectionLimit: 100
  });

  return connection.promise();
}

export default createConection();
