import db from '../../connection.js';
import { errorMessage } from '../../utils/error.js';

const TABLE_NAME = 'film';

export async function getAllFilmService() {
  try {
    const query = `select * from ${TABLE_NAME}`;

    const [rows, fields] = await db.query(query);

    if (!Array.isArray(rows) || !rows.length) return errorMessage(404, 'NOT FOUND!');

    return rows;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function getOneFilmByNameService(name) {
  try {
    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function addOneFilmService(id, body) {
  try {
    
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}
