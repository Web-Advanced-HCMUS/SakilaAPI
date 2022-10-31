import db from "../../connection.js";
import moment from "moment/moment.js";
import { errorMessage } from "../../utils/error.js";

const TABLE_NAME = 'actor';

export async function getListAllService() {
  try {
    const query = `select * from ${TABLE_NAME}`;

    const [rows, fields] = await db.query(query);

    return rows.length ? rows : errorMessage(404, 'Not found');
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function findOneByIdService(id) {
  try {
    const query = `select * from ${TABLE_NAME} where actor_id=${id}`;

    const [rows, fields] = await db.query(query);

    return rows.length ? rows[0] : errorMessage(404, 'Not found');
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function addActorService(body) {
  try {
    const query = `insert into ${TABLE_NAME} set ?`;

    const last_update = new Date();

    await db.query(query, { ...body, last_update });

    return true;
  } catch (error) {
    return errorMessage(500, error.toString())
  }
}

export async function deleteOneActorService(id) {
  try {
    const query = `delete from ${TABLE_NAME} where actor_id=${id}`;

    await db.query(query);

    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function updateOneActorService(body) {
  try {
    const { id, firstName, lastName } = body;
    const checkExistQuery = `select * from ${TABLE_NAME} where actor_id=${id}`;

    const [existRows, existField] = await db.query(checkExistQuery);

    if (!existRows[0]) return errorMessage(404, 'NOT FOUND');
    
    const updateQuery = `update actor set first_name='${firstName}', last_name='${lastName}' where actor_id=${id}`;

    await db.query(updateQuery);

    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}
