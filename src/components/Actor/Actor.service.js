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